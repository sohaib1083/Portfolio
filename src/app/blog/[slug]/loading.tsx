import { Container, Header } from "@/components/site/Chrome";

export default function Loading() {
  return (
    <>
      <Header current="blog" />
      <Container className="pt-8 sm:pt-14">
        <div className="mx-auto max-w-[44rem] animate-pulse" aria-label="Loading post">
          <div className="h-3 w-24 rounded bg-line" />
          <div className="mt-10 h-3 w-56 rounded bg-line" />
          <div className="mt-5 h-10 w-full rounded bg-line" />
          <div className="mt-3 h-10 w-2/3 rounded bg-line" />
          <div className="mt-10 space-y-3">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="h-3.5 rounded bg-line" style={{ width: `${100 - (i % 3) * 12}%` }} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
