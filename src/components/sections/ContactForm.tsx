import { useEffect, useId, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import { CircleCheck, ImagePlus, Info, X } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  NativeSelect,
  NativeSelectOption,
  Separator,
  Spinner,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@klicktipp/traqqr-components';
import { buttonVariants, cn } from '@klicktipp/traqqr-components/utils';
import type { Locale } from '@/i18n';

export interface ContactFormCopy {
  title: string;
  required: string;
  email: { label: string; placeholder: string };
  topic: { label: string; options: { value: string; label: string }[] };
  subject: { label: string; placeholder: string };
  message: { label: string; placeholder: string; tooltip: string; tooltipLabel: string; limit: string };
  attachments: { label: string; drop: string; rules: string; browse: string; remove: string };
  privacy: { before: string; link: string; after: string };
  submit: string;
  sending: string;
  errors: {
    email: string;
    message: string;
    tooManyFiles: string;
    /** {name} is the file's name. */
    fileType: string;
    imageSize: string;
    csvSize: string;
    csvFormula: string;
    failed: string;
  };
  /** {email} is the address they gave. */
  sent: { title: string; body: string; action: string };
}

interface ContactFormProps {
  locale: Locale;
  copy: ContactFormCopy;
  privacyHref: string;
  helpHref: string;
  /** Where the form posts (multipart). Until the backend is decided (Kev, 6 Nov) nothing answers there, so
   * a send ends in the "send failed" state. */
  endpoint: string;
}

const MAX_LENGTH = 5000;
const MAX_FILES = 5;
const MB = 1024 * 1024;
const IMAGE_TYPES = /\.(png|jpe?g|gif)$/i;
const intlLocale: Record<Locale, string> = { de: 'de-DE', en: 'en-GB' };

type FieldName = 'email' | 'message';

/** The old support form's CSV rule: no cell may start with =, +, - or @ (formula injection). Cells are split
 * on comma or semicolon; a leading quote is skipped. */
async function csvHasFormula(file: File) {
  const text = await file.text();
  return text.split(/\r?\n/).some((line) => line.split(/[;,]/).some((cell) => /^["']?\s*[=+\-@]/.test(cell.trimStart())));
}

// Contact form (Kev, 6 Nov: Figma 5393:3 DE, 5394:2 EN, mobile 5394:857, states 5394:652). Stock Field
// components; the email and message are required, the topic comes from ?thema= / ?topic= (Support by
// default). Errors show on submit, and focus goes to the first invalid field. Attachments are checked as
// they're added: up to 5, PNG/JPG/GIF up to 10 MB, CSV up to 2 MB without formula cells. Once sent, the
// card shows a confirmation at the same height, and focus moves to it. Needs hydrating (client:load).
export function ContactForm({ locale, copy, privacyHref, helpHref, endpoint }: ContactFormProps) {
  const id = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState(copy.topic.options[0].value);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>();
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'failed' | 'sent'>('idle');
  const [sentTo, setSentTo] = useState('');
  const [height, setHeight] = useState<number>();
  const [dragging, setDragging] = useState(false);
  const count = new Intl.NumberFormat(intlLocale[locale]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wanted = params.get('thema') ?? params.get('topic');
    if (wanted && copy.topic.options.some((option) => option.value === wanted)) setTopic(wanted);
  }, [copy.topic.options]);

  useEffect(() => {
    if (status === 'sent') sentRef.current?.focus();
  }, [status]);

  const addFiles = async (incoming: File[]) => {
    const next = [...files];
    let error: string | undefined;
    for (const file of incoming) {
      const csv = /\.csv$/i.test(file.name);
      if (next.length >= MAX_FILES) error = copy.errors.tooManyFiles;
      else if (!csv && !IMAGE_TYPES.test(file.name)) error = copy.errors.fileType.replace('{name}', file.name);
      else if (!csv && file.size > 10 * MB) error = copy.errors.imageSize.replace('{name}', file.name);
      else if (csv && file.size > 2 * MB) error = copy.errors.csvSize.replace('{name}', file.name);
      else if (csv && (await csvHasFormula(file))) error = copy.errors.csvFormula.replace('{name}', file.name);
      else next.push(file);
    }
    setFiles(next);
    setFileError(error);
  };

  const onPick = (event: ChangeEvent<HTMLInputElement>) => {
    void addFiles([...(event.target.files ?? [])]);
    event.target.value = '';
  };
  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragging(false);
    void addFiles([...event.dataTransfer.files]);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const found: Partial<Record<FieldName, string>> = {};
    if (!email.value.trim() || !email.validity.valid) found.email = copy.errors.email;
    if (!message.trim()) found.message = copy.errors.message;
    setErrors(found);
    const first = (['email', 'message'] as const).find((name) => found[name]);
    if (first) {
      (form.elements.namedItem(first) as HTMLElement).focus();
      return;
    }

    const data = new FormData(form);
    data.delete('attachments');
    for (const file of files) data.append('attachments', file);
    // The confirmation keeps the form's height, so the page doesn't jump.
    setHeight(form.offsetHeight);
    setStatus('sending');
    try {
      const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(String(response.status));
      setSentTo(email.value.trim());
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  const card = 'rounded-xl border border-white/10 bg-card p-6 lg:p-8';

  if (status === 'sent') {
    return (
      <div className={cn(card, 'flex flex-col items-center justify-center gap-3 text-center')} style={{ minHeight: height }}>
        <div ref={sentRef} tabIndex={-1} role="status" className="flex flex-col items-center gap-3 outline-none">
          <CircleCheck className="size-8 text-success-text" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="text-xl leading-7 font-normal text-foreground">{copy.sent.title}</h2>
          <p className="text-sm leading-5 text-muted-foreground">{copy.sent.body.replace('{email}', sentTo)}</p>
        </div>
        <a href={helpHref} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'mt-2')}>
          {copy.sent.action}
        </a>
      </div>
    );
  }

  const asterisk = (
    <span className="text-muted-foreground" aria-hidden="true">
      *
    </span>
  );

  return (
    <form noValidate onSubmit={onSubmit} className={card} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="text-xl leading-7 font-normal text-foreground">
        {copy.title}
      </h2>
      <p className="mt-1.5 text-sm leading-5 text-muted-foreground">{copy.required}</p>
      <Separator className="my-6" />

      <FieldGroup className="gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-4">
          <Field data-invalid={errors.email ? true : undefined}>
            <FieldLabel htmlFor={`${id}-email`}>
              {copy.email.label} {asterisk}
            </FieldLabel>
            <Input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={copy.email.placeholder}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? `${id}-email-error` : undefined}
              onChange={() => errors.email && setErrors({ ...errors, email: undefined })}
            />
            <FieldError id={`${id}-email-error`}>{errors.email}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor={`${id}-topic`}>
              {copy.topic.label} {asterisk}
            </FieldLabel>
            <NativeSelect id={`${id}-topic`} name="topic" required value={topic} onChange={(event) => setTopic(event.target.value)} className="w-full">
              {copy.topic.options.map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor={`${id}-subject`}>{copy.subject.label}</FieldLabel>
          <Input id={`${id}-subject`} name="subject" placeholder={copy.subject.placeholder} maxLength={200} />
        </Field>

        <Field data-invalid={errors.message ? true : undefined}>
          <div className="flex items-center gap-1.5">
            <FieldLabel htmlFor={`${id}-message`}>
              {copy.message.label} {asterisk}
            </FieldLabel>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  type="button"
                  aria-label={copy.message.tooltipLabel}
                  className="flex size-5 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <Info className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                </TooltipTrigger>
                <TooltipContent className="max-w-64">{copy.message.tooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea
            id={`${id}-message`}
            name="message"
            required
            maxLength={MAX_LENGTH}
            value={message}
            placeholder={copy.message.placeholder}
            className="max-h-96 min-h-40"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={`${id}-message-limit ${id}-message-count${errors.message ? ` ${id}-message-error` : ''}`}
            onChange={(event) => {
              setMessage(event.target.value);
              if (errors.message) setErrors({ ...errors, message: undefined });
            }}
          />
          <FieldError id={`${id}-message-error`}>{errors.message}</FieldError>
          <div className="flex justify-between gap-4 *:mt-0!">
            <FieldDescription id={`${id}-message-limit`}>{copy.message.limit}</FieldDescription>
            <FieldDescription id={`${id}-message-count`} className="tabular-nums">
              {count.format(message.length)} / {count.format(MAX_LENGTH)}
            </FieldDescription>
          </div>
        </Field>

        <Field data-invalid={fileError ? true : undefined}>
          <FieldLabel htmlFor={`${id}-files`}>{copy.attachments.label}</FieldLabel>
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={cn(
              'flex flex-col items-start gap-4 rounded-lg border border-dashed p-4 transition-colors md:flex-row md:items-center',
              dragging ? 'border-white/40 bg-white/[0.04]' : 'border-white/15',
            )}
          >
            <span className="flex size-[42px] shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
              <ImagePlus className="size-5 text-foreground" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-sm leading-5 text-foreground">{copy.attachments.drop}</p>
              <p id={`${id}-files-rules`} className="text-xs leading-[18px] text-muted-foreground">
                {copy.attachments.rules}
              </p>
            </div>
            <Button type="button" variant="outline" size="lg" onClick={() => fileRef.current?.click()}>
              {copy.attachments.browse}
            </Button>
            <input
              ref={fileRef}
              id={`${id}-files`}
              name="attachments"
              type="file"
              multiple
              accept=".png,.jpg,.jpeg,.gif,.csv,image/png,image/jpeg,image/gif,text/csv"
              aria-describedby={`${id}-files-rules${fileError ? ` ${id}-files-error` : ''}`}
              className="sr-only"
              onChange={onPick}
            />
          </div>
          <FieldError id={`${id}-files-error`}>{fileError}</FieldError>
          {files.length > 0 && (
            <ul className="flex flex-col gap-2">
              {files.map((file, i) => (
                <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 px-3 py-2 text-sm">
                  <span className="min-w-0 truncate text-foreground">{file.name}</span>
                  <span className="flex shrink-0 items-center gap-2 text-muted-foreground">
                    <span className="font-mono text-xs">{count.format(Math.max(1, Math.round(file.size / 1024)))} KB</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`${copy.attachments.remove}: ${file.name}`}
                      onClick={() => {
                        setFiles(files.filter((_, j) => j !== i));
                        setFileError(undefined);
                      }}
                    >
                      <X aria-hidden="true" />
                    </Button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Field>

        {/* Spam: a field people never see; the backend drops anything that fills it. */}
        <div className="hidden" aria-hidden="true">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="locale" value={locale} />

        <p className="text-xs leading-[18px] text-muted-foreground">
          {copy.privacy.before}
          <a href={privacyHref} className="underline underline-offset-2 hover:text-foreground">
            {copy.privacy.link}
          </a>
          {copy.privacy.after}
        </p>

        {status === 'failed' && (
          <Alert variant="destructive" role="alert">
            <AlertDescription>{copy.errors.failed}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <Spinner aria-hidden="true" />
              {copy.sending}
            </>
          ) : (
            copy.submit
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
