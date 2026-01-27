interface EyeSlashIcon {
  className: string
}

export default function EyeSlashIcon({ className }: EyeSlashIcon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m 4.2788792,7.8045691 c -0.9355447,1.1041768 -1.6321844,2.3902029 -2.046,3.7769999 1.292,4.338 5.31,7.5 10.0660008,7.5 0.993,0 1.953,-0.138 2.863,-0.395 M 6.5268792,5.8095691 c 1.7126461,-1.1301393 3.7200838,-1.7311185 5.7720008,-1.728 4.756,0 8.773,3.162 10.065,7.4979999 -0.708041,2.369337 -2.22796,4.413599 -4.293,5.774 M 6.5268792,5.8095691 l -3.228,-3.228 m 3.228,3.228 3.6500008,3.65 m 7.894,7.8939999 3.228,3.228 m -3.228,-3.228 -3.65,-3.65 m 0,0 c 2.830563,-2.828665 -1.412437,-7.0716649 -4.243,-4.2429999 m 4.242,4.2419999 -4.241,-4.2409999" />
    </svg>
  )
}
