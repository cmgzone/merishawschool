import { values } from "@/data/academics";

const valueItems = values.map((value) => `${value.letter} - ${value.label}`);
const repeatedValues = [...valueItems, ...valueItems];

export default function ValuesMarquee() {
  return (
    <section
      className="values-marquee border-y border-brand-gold/30 bg-brand-burgundy py-5 text-white"
      aria-label="Merishaw values"
    >
      <div className="values-marquee-track gap-8">
        {repeatedValues.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-8 whitespace-nowrap"
            aria-hidden={index >= valueItems.length ? "true" : undefined}
          >
            <span className="font-serif text-3xl font-semibold text-brand-gold sm:text-4xl">
              {item}
            </span>
            <span className="h-2 w-2 rounded-full bg-brand-gold/70" />
          </div>
        ))}
      </div>
    </section>
  );
}

