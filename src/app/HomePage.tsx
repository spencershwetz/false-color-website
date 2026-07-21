import Image from "next/image";
import { AppStoreLink, MacAppStoreComingSoon } from "./AppStoreLink";
import { ExposureModeDemo } from "./ExposureModeDemo";
import { LanguageSelector } from "./LanguageSelector";
import {
  getLocaleContent,
  localeUrl,
  seoDescription,
  textDirection,
} from "./localization";
import { ReviewSessionReveal } from "./ReviewSessionReveal";
import { appIconPath, appStoreUrl, ogImagePath, siteUrl } from "./site";

function Spectrum() {
  return (
    <div className="spectrum" aria-hidden="true">
      <span className="spectrumNeedle" />
    </div>
  );
}

export function HomePage({ locale = "en-US" }: { locale?: string }) {
  const content = getLocaleContent(locale);
  const showEnglishFaq = content.locale.startsWith("en-");
  const localizedDescription = seoDescription(content);
  const pageUrl = localeUrl(content.locale);
  const descriptionLines =
    content.descriptionLines.length > 0
      ? content.descriptionLines
      : [content.subtitle, content.promotionalText];
  const heroDescription = descriptionLines.slice(0, 2).join(" ");
  const platformCards = [
    { platform: "iOS", body: descriptionLines[0] ?? content.subtitle },
    { platform: "iPadOS", body: descriptionLines[1] ?? content.subtitle },
    {
      platform: "macOS",
      body: descriptionLines[2] ?? content.promotionalText,
      comingSoon: true,
    },
  ];
  const featureList = [
    ...content.keywords,
    "iOS",
    "iPadOS",
    "EL Zone",
    "ARRI",
    "Blackmagic",
    content.customLabel,
  ];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: content.name,
    applicationCategory: "PhotoApplication",
    operatingSystem: "iOS, iPadOS",
    url: pageUrl,
    image: [`${siteUrl}${ogImagePath}`, `${siteUrl}${appIconPath}`],
    sameAs: [appStoreUrl],
    installUrl: appStoreUrl,
    description: localizedDescription,
    featureList,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
  const faqItems = [
    {
      question: "What is false color exposure?",
      answer:
        "False color replaces image brightness ranges with distinct colors so cinematographers can quickly judge shadows, midtones, skin tones, and highlights.",
    },
    {
      question: "Which false color systems are included?",
      answer:
        "False Color Viewer includes EL Zone, ARRI, Blackmagic, and customizable exposure maps for comparing common on-set monitoring workflows.",
    },
    {
      question: "Does False Color Viewer upload my footage?",
      answer:
        "No. Imported photos and videos are analyzed locally on your iPhone or iPad, so your media stays on your device.",
    },
    {
      question: "Can I use it for both photos and video?",
      answer:
        "Yes. You can import photos or video clips and inspect exposure with the same false color tools on iOS and iPadOS.",
    },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {showEnglishFaq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <main lang={content.locale} dir={textDirection(content.locale)}>
        <LanguageSelector currentLocale={content.locale} />
        <section className="hero" aria-labelledby="hero-title">
          <Image
            className="heroImage"
            src="/product/backlight-el-zone.jpg"
            alt={`${content.name} EL Zone false color exposure preview`}
            width={1920}
            height={800}
            sizes="100vw"
            priority
          />
          <div className="heroShade" />

          <nav className="topbar" aria-label={content.name}>
            <a className="brand" href="#top" aria-label={content.name}>
              <Image
                src={appIconPath}
                alt={`${content.name} app icon`}
                width={42}
                height={42}
                sizes="42px"
                priority
              />
              <span>{content.name}</span>
            </a>
          </nav>

          <div id="top" className="heroInner">
            <div className="heroCopy">
              <p className="eyebrow">{content.subtitle}</p>
              <h1 id="hero-title">{content.name}</h1>
              <p className="heroLead">
                {heroDescription} Available on iOS and iPadOS. macOS coming
                soon.
              </p>
              <div className="heroActions" dir="ltr">
                <AppStoreLink
                  aria-label={content.name}
                  className="appStoreBadge"
                  locale={content.locale}
                  location="hero"
                />
                <MacAppStoreComingSoon
                  label={content.name}
                  locale={content.locale}
                />
              </div>
            </div>
            <div className="meterPanel" aria-label={content.subtitle} dir="ltr">
              <Image
                src={appIconPath}
                alt={`${content.name} app icon`}
                width={120}
                height={120}
                className="meterIcon"
                sizes="120px"
                priority
              />
              <p>IRE</p>
              <Spectrum />
              <div className="meterLabels" aria-hidden="true">
                <span>0</span>
                <span>39 IRE</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </section>

        <section id="systems" className="section systems">
          <div className="sectionCopy">
            <p className="sectionKicker">{content.subtitle}</p>
            <h2>{content.promotionalText}</h2>
          </div>
          <div className="systemList">
            {descriptionLines.map((line) => (
              <article className="systemItem" key={line}>
                <h3>{line}</h3>
              </article>
            ))}
          </div>
        </section>

        <ExposureModeDemo content={content} />

        <section className="section platformSection">
          <div className="sectionCopy">
            <p className="sectionKicker">iOS · iPadOS · macOS soon</p>
            <h2>{content.subtitle}</h2>
            <p>{descriptionLines[0]}</p>
          </div>
          <div className="platformList">
            {platformCards.map((feature) => (
              <article className="platformItem" key={feature.platform}>
                <h3>
                  {feature.platform}
                  {"comingSoon" in feature && feature.comingSoon
                    ? " · Coming soon"
                    : ""}
                </h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="showcase">
          <Image
            src="/product/skin-tone.jpg"
            alt={`${content.name} skin-tone exposure reference before false color`}
            width={1920}
            height={800}
            sizes="100vw"
            loading="lazy"
          />
          <div className="showcaseCopy">
            <p className="sectionKicker">{content.subtitle}</p>
            <h2>{descriptionLines[1] ?? content.subtitle}</h2>
            <p>{descriptionLines[0]}</p>
          </div>
        </section>

        <section id="review" className="section detailGrid">
          <div className="detailCopy">
            <p className="sectionKicker">EL Zone</p>
            <h2>{descriptionLines[2] ?? content.promotionalText}</h2>
            <p>{descriptionLines[3] ?? content.promotionalText}</p>
          </div>
          <ReviewSessionReveal content={content} />
        </section>

        {showEnglishFaq ? (
        <section id="faq" className="section faqSection" aria-labelledby="faq-title">
          <div className="sectionCopy">
            <p className="sectionKicker">False color explained</p>
            <h2 id="faq-title">Exposure questions, answered.</h2>
            <p>
              A quick guide to using False Color Viewer in a photo and video
              exposure workflow.
            </p>
          </div>
          <div className="faqList">
            {faqItems.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        ) : null}

        <section className="finalCta">
          <h2>{content.subtitle}</h2>
          <div className="finalActions" dir="ltr">
            <AppStoreLink
              aria-label={content.name}
              className="appStoreBadge"
              locale={content.locale}
              location="final-cta"
            />
            <MacAppStoreComingSoon
              label={content.name}
              locale={content.locale}
            />
          </div>
        </section>
      </main>
    </>
  );
}
