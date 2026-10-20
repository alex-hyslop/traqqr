import { Fragment } from 'react';

// Keeps Figma's manual line breaks on desktop and lets the text wrap naturally below lg
// (handover §3b: "the headline's manual line break is dropped" on mobile).
export function DesktopLines({ lines }: { lines: string | string[] }) {
  const list = Array.isArray(lines) ? lines : [lines];
  return (
    <>
      {list.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <>
              {' '}
              <br className="hidden lg:inline" />
            </>
          )}
          {line}
        </Fragment>
      ))}
    </>
  );
}
