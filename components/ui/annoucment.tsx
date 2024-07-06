
import Link from "next/link"
type AnnouncementProps = {
  text: string;
  tag: string;
    time: Date;
};
export default function Announcement({ text, time,tag }: AnnouncementProps) {
  return (
    <div className="bg-yellow-300 text-primary-foreground py-3 px-4 flex items-center justify-between gap-4 animate-slide-in">
      <div className="flex items-center gap-4 overflow-hidden ">
        <MegaphoneIcon className="w-5 h-5 animate-bounce  text-black" />
        <div className="flex-1 overflow-x-auto whitespace-nowrap">
          <span className="inline-block animate-marquee  text-black">{text}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
        </div>
        <Link
          href={`${tag}`}
          className="inline-flex items-center gap-2  text-black rounded-md bg-primary-foreground px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          prefetch={false}
        >
          <RocketIcon className="w-4 h-4 animate-pulse  text-black  " />
          Offers
        </Link>
      </div>
    </div>
  )
}

type IconProps = React.SVGProps<SVGSVGElement>;

function ClockIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MegaphoneIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

function RocketIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}