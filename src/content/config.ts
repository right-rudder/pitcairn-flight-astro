import { defineCollection, z } from "astro:content";
import { COMPANY_NAME } from "../data/consts";

const crewCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
    image: z.string(),
    order: z.number().optional(),
    certifications: z.array(z.string()).optional(),
    experience: z.string().optional(),
  }),
});

// const programsCollection = defineCollection({
//   type: "content",
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     duration: z.string(),
//     cost: z.string().optional(),
//     image: z.string(),
//     order: z.number().optional(),
//     highlights: z.array(z.string()).optional(),
//     requirements: z.array(z.string()).optional(),
//   }),
// });

const programsCollection = defineCollection({
  type: "content",
  schema: z.object({
    // Standard metadata
    title: z.string().optional(),
    description: z.string().optional(),
    order: z.number().optional(),
    image: z.string().optional(),
    alt: z.string().optional(),
    reverse: z.boolean().optional(),
    top: z.boolean().optional(),

    // 1. Introduction Section
    programIntroduction: z
      .object({
        title: z.string().optional(),
        upperheader: z.string().optional(),
        descriptionParagraphs: z.array(z.string()).optional(),
        highlights: z
          .array(
            z.object({
              highlightName: z.string(),
              highlightValue: z.string(),
              pricingObservation: z.string().optional(),
            })
          )
          .optional(),
        programHighlights: z
          .object({
            benefits: z.array(z.string()).optional(),
            requirements: z.array(z.string()).optional(),
          })
          .optional(),
      })
      .optional(),

    //  Training Environment/Expectations
    programExpectations: z
      .object({
        title: z.string(),
        mainImage: z.string().optional(),
        mainImageAlt: z.string().optional(),
        descriptionParagraphs: z.array(z.string()),
        listItems: z.array(z.string()).optional(),
      })
      .optional(),

    // 2. First CTA Section
    firstCTA: z
      .object({
        mainImage: z.string().optional(),
        title: z.string().optional(),
        upperheader: z.string().optional(),
        descriptionParagraphs: z.array(z.string()).optional(),
      })
      .optional(),

    // 3. What is Included Section
    whatIsIncluded: z
      .object({
        mainImage: z.string().optional(),
        title: z.string().optional(),
        upperheader: z.string().optional(),
        descriptionParagraphs: z.array(z.string()).optional(),
        bulletPointLists: z
          .array(
            z.object({
              title: z.string(),
              items: z.array(z.string()),
            })
          )
          .optional(),
      })
      .optional(),

    // 4. Why Us Section
    whyUs: z
      .object({
        title: z.string().optional(),
        upperheader: z.string().optional(),
        topicTitle: z.string().optional(),
        topicDescriptionParagraphs: z.array(z.string()).optional(),
        bulletTitle: z.string().optional(),
        bulletDescriptionParagraphs: z.array(z.string()).optional(),
        bulletPoints: z.array(z.string()).optional(),
        closingTitle: z.string().optional(),
        closingDescriptionParagraphs: z.array(z.string()).optional(),
      })
      .optional(),

    //  Career/Incentives (Incentive-Based Progression)
    careerPathways: z
      .object({
        title: z.string(),
        upperheader: z.string().optional(),
        descriptionParagraphs: z.array(z.string()).optional(),
        opportunities: z.array(z.string()),
        disclaimer: z.string().optional(),
      })
      .optional(),

    //  Target Audience (Who This Program Is For)
    targetAudience: z
      .object({
        title: z.string(),
        items: z.array(z.string()),
        notFor: z.string().optional(),
      })
      .optional(),

    // 5. Training Progression Section
    trainingProgression: z
      .object({
        title: z.string().optional(),
        upperheader: z.string().optional(),
        descriptionParagraphs: z.array(z.string()).optional(),
        phases: z
          .array(
            z.object({
              phaseTitle: z.string(),
              phaseBulletPoints: z.array(z.string()),
            })
          )
          .optional(),
        outcome: z.string().optional(),
      })
      .optional(),

    //  Enrollment Process (How to Get Started)
    enrollmentProcess: z
      .object({
        title: z.string(),
        steps: z.array(
          z.object({
            stepNumber: z.number(),
            title: z.string(),
            description: z.string(),
          })
        ),
      })
      .optional(),

    // 6. FAQ Section
    faq: z
      .object({
        title: z.string().optional(),
        upperheader: z.string().optional(),
        qnas: z
          .array(
            z.object({
              question: z.string(),
              answer: z.string(),
            })
          )
          .optional(),
      })
      .optional(),

    // 7. Final CTA Section
    finalCTA: z
      .object({
        mainImage: z.string().optional(),
        mainImageAlt: z.string().optional(),
        title: z.string().optional(),
        upperheader: z.string().optional(),
        descriptionParagraphs: z.array(z.string()).optional(),
        mainButtonText: z.string().optional(),
        mainButtonLink: z.string().optional(),
        secondButtonText: z.string().optional(),
        secondButtonLink: z.string().optional(),
      })
      .optional(),
  }),
});

const aircraftCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    model: z.string(),
    description: z.string(),
    tailNumber: z.string().optional(),
    image: z.string(),
    specifications: z
      .object({
        engines: z.number().optional(),
        seats: z.number().optional(),
        range: z.string().optional(),
        cruiseSpeed: z.string().optional(),
      })
      .optional(),
    features: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
  }),
});

const faqsCollection = defineCollection({
  type: "content",
  schema: z.object({
    question: z.string(),
    answer: z.string().optional(),
    category: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  crew: crewCollection,
  programs: programsCollection,
  aircraft: aircraftCollection,
  blog: blogCollection,
  faqs: faqsCollection,
};
