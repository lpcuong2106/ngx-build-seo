import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

// Interface for meta tag updates
interface MetaTagsUpdate {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  imageUrl?: string;
  url?: string;
  robots?: string;
}

// Interface for Twitter Card tags
interface TwitterTags {
  cardType?: string;
  title?: string;
  creator?: string;
  description: string;
  image?: string;
}

// Interface for breadcrumb items
interface BreadcrumbItem {
  name: string;
  url: string;
}

// Interface for Schema.org structured data
interface StructuredDataSchema {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

// Interface for SEO audit tags
interface SEOAuditTag {
  name: string;
  selector: string;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private meta: Meta;
  private title: Title;
  private document: Document;
  private platformId: Object;

  constructor(
    meta: Meta,
    title: Title,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.meta = meta;
    this.title = title;
    this.document = document;
    this.platformId = platformId;
  }

  // General Meta Tags and Open Graph
  updateMetaTags(tags: MetaTagsUpdate): void {
    try {
      // Update the document title and Open Graph title
      if (tags.title) {
        this.title.setTitle(tags.title);
        this.meta.updateTag({ property: 'og:title', content: tags.title });
      }

      // Update the meta description and Open Graph description
      if (tags.description) {
        this.meta.updateTag({ name: 'description', content: tags.description });
        this.meta.updateTag({
          property: 'og:description',
          content: tags.description,
        });
      }

      // Update the meta keywords
      if (tags.keywords) {
        this.meta.updateTag({ name: 'keywords', content: tags.keywords });
      }

      // Update the meta author
      if (tags.author) {
        this.meta.updateTag({ name: 'author', content: tags.author });
      }

      // Update the Open Graph image URL
      if (tags.imageUrl) {
        this.meta.updateTag({ property: 'og:image', content: tags.imageUrl });
      }

      // Update the Open Graph URL
      if (tags.url) {
        this.meta.updateTag({ property: 'og:url', content: tags.url });
      }

      // Set the robots meta tag if specified
      if (tags.robots) {
        this.setRobotsTag(tags.robots);
      }
    } catch (error) {
      // Handle any errors that occur during the meta tag updates
      console.error('Failed to update meta tags:', error);
      // Optionally, you could rethrow the error or handle it further
    }
  }

  // Twitter Card Tags
  setTwitterTags(tags: TwitterTags): void {
    try {
      // Update the Twitter Card type
      this.meta.updateTag({ name: 'twitter:card', content: tags?.cardType || '' });

      // Update the Twitter title
      this.meta.updateTag({ name: 'twitter:title', content: tags?.title || '' });

      // Update the Twitter creator
      this.meta.updateTag({ name: 'twitter:creator', content: tags?.creator || '' });

      // Update the Twitter description
      this.meta.updateTag({
        name: 'twitter:description',
        content: tags.description,
      });

      // Update the Twitter image
      this.meta.updateTag({ name: 'twitter:image', content: tags.image || '' });
    } catch (error) {
      // Handle any errors that occur during the Twitter tag updates
      console.error('Failed to set Twitter tags:', error);
      // Optionally, you could rethrow the error or handle it further
    }
  }

  // Canonical URL
  setCanonicalUrl(url: string): void {
    try {
      // Check if the platform is a browser
      if (isPlatformBrowser(this.platformId)) {
        // Create a new link element for the canonical URL
        const link: HTMLLinkElement = this.document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', url);

        // Remove any existing canonical link to avoid duplicates
        const existingLink: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
        if (existingLink) {
          this.document.head.removeChild(existingLink);
        }

        // Append the new canonical link to the document head
        this.document.head.appendChild(link);
      }
    } catch (error) {
      // Handle any errors that occur during the setting of the canonical URL
      console.error('Failed to set canonical URL:', error);
      // Optionally, you could rethrow the error or handle it further
    }
  }

  // Robots Meta Tag
  setRobotsTag(content: string): void {
    try {
      // Update the robots meta tag with the specified content
      this.meta.updateTag({ name: 'robots', content });
    } catch (error) {
      // Handle any errors that occur during the setting of the robots tag
      console.error('Failed to set robots meta tag:', error);
      // Optionally, you could rethrow the error or handle it further
    }
  }

  // Hreflang Tags for International SEO
  setHreflang(locale: string, url: string): void {
    try {
      // Check if the platform is a browser
      if (isPlatformBrowser(this.platformId)) {
        // Create a new link element for the hreflang tag
        const link: HTMLLinkElement = this.document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', locale);
        link.setAttribute('href', url);

        // Remove any existing hreflang tag for the locale to avoid duplicates
        const existingLink: HTMLLinkElement | null = this.document.querySelector(
          `link[rel="alternate"][hreflang="${locale}"]`
        );
        if (existingLink) {
          this.document.head.removeChild(existingLink);
        }

        // Append the new hreflang link to the document head
        this.document.head.appendChild(link);
      }
    } catch (error) {
      // Handle any errors that occur during the setting of the hreflang tag
      console.error('Failed to set hreflang tag:', error);
      // Optionally, you could rethrow the error or handle it further
    }
  }

  // Structured Data Markup (Schema.org)
  setStructuredData(schema: StructuredDataSchema): void {
    try {
      // Check if the platform is a browser
      if (isPlatformBrowser(this.platformId)) {
        // Create a new script element for structured data markup
        const script: HTMLScriptElement = this.document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);

        // Remove any existing structured data script to avoid duplicates
        const existingScript: HTMLScriptElement | null = this.document.querySelector(
          'script[type="application/ld+json"]'
        );
        if (existingScript) {
          this.document.head.removeChild(existingScript);
        }

        // Append the new structured data script to the document head
        this.document.head.appendChild(script);
      }
    } catch (error) {
      // Handle any errors that occur during the setting of structured data
      console.error('Failed to set structured data markup:', error);
      // Optionally, you could rethrow the error or handle it further
    }
  }

  // Breadcrumbs JSON-LD Markup
  setBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]): void {
    try {
      // Construct the schema for breadcrumbs in JSON-LD format
      const schema: StructuredDataSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((breadcrumb: BreadcrumbItem, index: number) => ({
          '@type': 'ListItem',
          position: index + 1, // Position of the breadcrumb in the list
          name: breadcrumb.name, // Name of the breadcrumb
          item: breadcrumb.url, // URL of the breadcrumb
        })),
      };

      // Set the structured data using the generated schema
      this.setStructuredData(schema);
    } catch (error) {
      // Handle any errors that occur during the creation of the breadcrumb schema
      console.error('Failed to set breadcrumb schema:', error);
      // Optionally, you could rethrow the error or handle it further
    }
  }

  // Audit SEO - Checks for essential tags
  auditSEO(): void {
    try {
      // Check if the platform is a browser
      if (isPlatformBrowser(this.platformId)) {
        // Define the essential tags to check for
        const tags: SEOAuditTag[] = [
          { name: 'title', selector: 'meta[property="og:title"]' },
          { name: 'description', selector: 'meta[property="og:description"]' },
          { name: 'image', selector: 'meta[property="og:image"]' },
        ];

        // Loop through each tag to check if it exists in the document
        tags.forEach((tag: SEOAuditTag) => {
          // Check for the existence of the tag using its selector
          if (!this.document.querySelector(tag.selector)) {
            // Log a warning if the tag is missing
            console.warn(`Missing essential SEO tag: ${tag.name}`);
          } else {
            // Log confirmation if the tag is present
            console.log(`=> SEO Audit - No problems found in: ${tag.name}`);
          }
        });
      }
    } catch (error) {
      // Handle any errors that occur during the SEO audit process
      console.error('Failed to audit SEO tags:', error);
      // Optionally, you could rethrow the error or handle it further
    }
  }
}