import { SVGProps } from 'react';
export function Star(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      stroke="#D9D9D9"
      {...props}
    >
      <path
        fill="none"
        d="m8 0 1.796 5.528h5.813l-4.703 3.416 1.796 5.528L8 11.056l-4.702 3.416 1.796-5.528L.392 5.528h5.812L8 0Z"
      />
    </svg>
  );
}
