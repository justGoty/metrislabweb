import { useTranslation } from 'react-i18next';

interface LogoProps {
  className?: string;
  /** Colour scheme: 'light' = dark text (for light backgrounds), 'dark' = white text (for dark backgrounds) */
  scheme?: 'light' | 'dark';
  /** Height in px passed as SVG height attribute */
  height?: number;
}

export default function Logo({ className = '', scheme = 'light', height = 48 }: LogoProps) {
  const { i18n } = useTranslation();
  const isRu = i18n.language.startsWith('ru');

  const nameText = isRu ? 'МЭТРИС' : 'METRIS';
  const subText = isRu ? 'ЛАБ' : 'LAB';
  const textColor = scheme === 'dark' ? '#e2e8f0' : '#0f172a';
  const subColor = scheme === 'dark' ? '#94a3b8' : '#64748b';

  // Width scales with the name text length
  const width = height * (isRu ? 4.8 : 4.4);
  const scale = height / 48;
  const iconW = 40 * scale;
  const iconH = 40 * scale;
  const iconX = 4 * scale;
  const iconY = 4 * scale;
  const rx = 8 * scale;
  const textX = 54 * scale;
  const textY1 = 32 * scale;
  const textY2 = 44 * scale;
  const fontSize1 = 22 * scale;
  const fontSize2 = 10 * scale;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      height={height}
      width={width}
      fill="none"
      className={className}
      aria-label={isRu ? 'Мэтрис Лаб' : 'Metris Lab'}
    >
      <rect width={iconW} height={iconH} x={iconX} y={iconY} rx={rx} fill="#2563eb" />
      <path
        d={`M${14 * scale} ${34 * scale} L${20 * scale} ${14 * scale} L${28 * scale} ${28 * scale} L${36 * scale} ${14 * scale} L${42 * scale} ${34 * scale}`}
        stroke="white"
        strokeWidth={3 * scale}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text
        x={textX}
        y={textY1}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize={fontSize1}
        fontWeight="700"
        fill={textColor}
        letterSpacing={-0.5 * scale}
      >
        {nameText}
      </text>
      <text
        x={textX}
        y={textY2}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize={fontSize2}
        fontWeight="500"
        fill={subColor}
        letterSpacing={3 * scale}
      >
        {subText}
      </text>
    </svg>
  );
}
