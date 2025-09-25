export interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 340 80"
      width={340}
      height={80}
      role="img"
      aria-labelledby="logoTitle"
    >
      <title id="logoTitle">Logo Legaleo</title>

      {/* Icône */}
      <g transform="translate(6,20)">
        <polygon fill="#fff" points="0,46 52,14 64,22 12,54" />
        <polygon fill="#fff" points="0,30 52,-2 64,6 12,38" />
        <polygon fill="#fff" points="0,14 52,-18 64,-10 12,22" />
      </g>

      {/* Texte centré verticalement par rapport à l’icône */}
      <text
        x="120"
        y="50%"
        fill="#fff"
        fontFamily="Inter, Helvetica Neue, Arial, sans-serif"
        fontWeight="700"
        fontSize="34"
        dominantBaseline="middle"
      >
        Legaleo
      </text>
    </svg>
  );
};
