import Image from 'next/image';

export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/ciboo-logo.jpeg"
      alt="Ciboo"
      width={640}
      height={640}
      sizes="138px"
      className={`brand-original ${className}`}
    />
  );
}

export default function Brand() {
  return (
    <a href="#inicio" className="brand" aria-label="Ciboo — início">
      <BrandLogo />
    </a>
  );
}
