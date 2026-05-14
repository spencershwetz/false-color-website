import Image from "next/image";
import { AppStoreLink, MacAppStoreComingSoon } from "./AppStoreLink";
import { ExposureModeDemo } from "./ExposureModeDemo";
import { LanguageSelector } from "./LanguageSelector";
import { getLocaleContent, seoDescription, textDirection } from "./localization";
import { ReviewSessionReveal } from "./ReviewSessionReveal";
import { appStoreUrl, siteUrl } from "./site";

function Spectrum() {
  return (
    <div className="spectrum" aria-hidden="true">
      <span className="spectrumNeedle" />
    </div>
  );
}

export function HomePage({ locale = "en-US" }: { locale?: string }) {
  const content = getLocaleContent(locale);
  const localizedDescription = seoDescription(content);
  const descriptionLines =
    content.descriptionLines.length > 0
      ? content.descriptionLines
      : [content.subtitle, content.promotionalText];
  const heroDescription = descriptionLines.slice(0, 2).join(" ");
  const platformCards = ["iOS", "iPadOS", "macOS"].map((platform, index) => ({
    platform,
    body: descriptionLines[index % descriptionLines.length],
  }));
  const keywordList = [
    ...content.keywords,
    "iOS",
    "iPadOS",
    "macOS",
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
    operatingSystem: "iOS, iPadOS, macOS",
    url: siteUrl,
    sameAs: [appStoreUrl],
    installUrl: appStoreUrl,
    description: localizedDescription,
    featureList: keywordList,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <main lang={content.locale} dir={textDirection(content.locale)}>
        <LanguageSelector currentLocale={content.locale} />
        <section className="hero" aria-labelledby="hero-title">
          <Image
            className="heroImage"
            src="/product/backlight-el-zone.jpg"
            alt=""
            width={1920}
            height={800}
            priority
          />
          <div className="heroShade" />

          <nav className="topbar" aria-label={content.name}>
            <a className="brand" href="#top" aria-label={content.name}>
              <Image
                src="/product/app-icon.png"
                alt=""
                width={42}
                height={42}
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
                {heroDescription} iOS, iPadOS, macOS.
              </p>
              <div className="heroActions" dir="ltr">
                <AppStoreLink
                  aria-label={content.name}
                  className="appStoreBadge"
                  locale={content.locale}
                  location="hero"
                />
                <MacAppStoreComingSoon label={content.name} locale={content.locale} />
              </div>
            </div>
            <div className="meterPanel" aria-label={content.subtitle} dir="ltr">
              <Image
                src="/product/app-icon.png"
                alt=""
                width={120}
                height={120}
                className="meterIcon"
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
            <p className="sectionKicker">iOS · iPadOS · macOS</p>
            <h2>{content.subtitle}</h2>
            <p>{descriptionLines[0]}</p>
          </div>
          <div className="platformList">
            {platformCards.map((feature) => (
              <article className="platformItem" key={feature.platform}>
                <h3>{feature.platform}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="showcase">
          <Image
            src="/product/skin-tone.jpg"
            alt={content.subtitle}
            width={1920}
            height={800}
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

        <section className="section seoSection">
          <p className="sectionKicker">{content.subtitle}</p>
          <h2>{content.promotionalText}</h2>
          <div className="keywordCloud" aria-label={content.subtitle}>
            {keywordList.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </section>

        <section className="finalCta">
          <h2>{content.subtitle}</h2>
          <div className="finalActions" dir="ltr">
            <AppStoreLink
              aria-label={content.name}
              className="appStoreBadge"
              locale={content.locale}
              location="final-cta"
            />
            <MacAppStoreComingSoon label={content.name} locale={content.locale} />
          </div>
        </section>
      </main>
    </>
  );
}
