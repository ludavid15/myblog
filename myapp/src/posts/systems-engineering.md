---
title: "Systems Engineering"
topic: "Engineering"
path: "systems-engineering"
author: "David Lu"
date: "2024-12-06"
---

If you've ever tried to manage a highly complex project, you know that a certain amount of organization is required. This kind of big-picture planning helps to reduce risk. However, it's important to remember that this kind of oversight ultimately serves the product. There is such a thing as too much management.

This is the balance to be struck in the world of systems engineering. Systems engineering is a set of practices for developing highly complex projects while minimizing risk. It is NOT a substitute for good communication or for responsible people (though it can help).

# Requirements

<v-divider></v-divider>

Requirements have been the backbone of aerospace systems engineering for a few decades now. The basic idea is that we write down a complete list of everything our project needs to do, and then break them down piece by piece. The idea is sound, but the execution gets messy very quickly, and is more art than science. 

Let's consider an example. Say we are trying to design a rocketship to Mars. We might define a few high level requirements that read:

1. The rocket shall carry 4 astronauts
2. The rocket shall be able to complete the mission in 2 years.
3. The rocket shall use electric propulsion systems.

Taking the first requirement, we can break it down logically into necessary components. This process then gets repeated over and over until we reach a good level of detail, or more likely, until we can't be bothered to keep going.

1. The rocket shall include a life support system to recycle oxygen.
2. The rocket shall include 5000 cubic feet of living space for the astronauts.
3. The rocket shall carry 3000 lbs of food and living equipment. 

Once all the requirements have been written, design work begins. The engineers build the rocketship exactly to spec, ahead of schedule and under budget, and then we fly to Mars. Err, ok maybe not. Before we launch we need to validate and verify that everything is good to go.

## Validation and Verification

The process of ensuring the design meets the expectation is known as the validation and verification step. **Verification** checks to see that the design satisfies the exact wording of the requirement. For example, we can measure the interior space of our rocket, and if we find that there is indeed 5000 cubic feet, we have verified that requirement. **Validation** checks that we're meeting the spirit of the requirement. In this case, the intent of this requirement is to provide astronauts with enough living space, but is 5000 really enough? What if the 5000 cubic feet is in the form of a 1 ft x 1 ft x 5000 ft narrow tube? Such a design would not meet the intent of the requirement, even though technically it satisfied the exact wording. 

There aren't really any rules on how a requirement should be written, but usually requirements do one of three things:

1. Define some desired function/feature (ex: shall send telemetry)
2. Define how well something has to be done (ex: shall be operational up to 100 deg)
3. Define an aspect of the design (ex: shall operate at 30V)


### Why Requirements?

My personal opinion of requirements is that they exist as a document of wants, agreed upon by the stakeholders. If I want or need A, I'll go to you, we can talk it over, and we write this down into our requirements document. 

This may be a good way to track our needs, (potentially comparable to "user stories" from agile), but I think we shouldn't imagine requirements to necessarily be a good model of your design. In other words, it's important for your model to meet the requirements, but the requirements are guaranteed to be a comprehensive model of your design.  


## Requirements in Practice

<v-divider></v-divider>

In real life, we often do not build things up from scratch. Instead a project is often an addition to, or a modification of something that already exists. Even though this is meant to simplify the process, it also creates a lot of additional work (as anyone who has tried to read someone else's code can testify). For this situation, there are often requirements which outline a specific design (i.e. shall use ABC hardware). 

## The Importance of Thread Owners

One danger of managing a complex and distributed team is the diffusion of responsibility. If there are too many overlapping roles, people may be confused about who owns what, and things end up falling through the cracks. To mitigate this, it's important to clearly define ownership. This is what a thread owner is. Threads might cover things like dynamics, or communication, or contamination, or cyber security. A thread owner is someone who owns these type of requirements at the highest level and it's their responsibility to track their impact and verification through all levels of the design. 

It's important to note that a thread owner is a function and not a title. As with many things in life, the true parent is the person who shows up everyday and knows all the little details, not the person who's name appears in the document. 

## Requirement Pitfalls

Just a few other things to watch out for when writing requirements.

<v-card variant="tonal">
  <v-card-title>
    1. Negatives
  </v-card-title>
  <v-card-text>
  Requirements that specify what *not* to do can be difficult to verify. For instance, something like "shall not fail" is a pretty worthless statement. In order to make something like this work, you should define the circumstances in which this applies, and these definitions should be *very* specific. 
  </v-card-text>
</v-card>

<v-spacer></v-spacer>

<v-card variant="tonal">
  <v-card-title>
    2. Subjective Goals
  </v-card-title>
  <v-card-text>
  This is intuitive, but requirements should not be subjective. "Shall be satisfactory" is vague. Good according to who? Again, being verifiable is important. This also goes for words like "shall minimize". The problem is 
  </v-card-text>
</v-card>

<v-spacer></v-spacer>

<v-card variant="tonal">
  <v-card-title>
    3. Not Including Rationale
  </v-card-title>
  <v-card-text>
  Even a perfectly good requirement can be challenging if there's confusion about why it exists. I promise that no matter how good your memory is, if you come back to a requirement many months later you'll be glad to have a rationale section. For instance, maybe a requirement was derived from a user study, but 2 years later, that study was proven to be unreliable. For situations like this, a rationale blurb would let you know quickly if a requirement is still relevant. 
  </v-card-text>
</v-card>

<v-spacer></v-spacer>

<v-card variant="tonal">
  <v-card-title>
    4. Requirements that are Constraints
  </v-card-title>
  <v-card-text>
  Another deceptively complex situation is to have a requirement that defines a constraint. For instance, "the satellite shall operate normally under xxx constraints". Ok, seems easy. But what if another part of the design fails to keep us within these constraints? Technically, we've still met this first requirement. We're just never operational, but that's ok because we're outside the limit. If you have a requirement like the first one, you'd better have a second requirement which defines availability, "the satellite shall be operational for 75% of the day".
  </v-card-text>
</v-card>

<v-spacer></v-spacer>

<v-card variant="tonal">
  <v-card-title>
    5. Multiple Parts in a Single Requirement
  </v-card-title>
  <v-card-text>
  The problem with having multiple parts to a requirement is that sometimes parts can be missed. This was actually likely one of the reasons why the Mars Polar Lander failed in 1999. A requirement about landing sensors included a second clause about being robust to spurious signals during descent. However during requirements flowdown, this clause failed to make it to the software team. The result was that software did not incoporate this aspect into their design. During the mission, an accidental signal during descent was registered by the software as a landing event, even though the lander was still far above the surface. 
  </v-card-text>
</v-card>

<v-spacer></v-spacer>

<v-card variant="tonal">
  <v-card-title>
    6. Describing Implementation Instead of Goals
  </v-card-title>
  <v-card-text>
Another requirement pitfall is to neglect the goal and jump right into an implementation. For example, maybe you want your requirements to be traceable with a change tracking system. This should be your requirement, rather than something like "requirements shall be maintained in a DOORs database". The latter prescribes an implementation, but misses all the important reasons *why* we are doing it this way.
  </v-card-text>
</v-card>

<v-spacer></v-spacer>

# Design Reviews

<v-divider></v-divider>

Design reviews are checkpoints, meant to ensure that a certain level of maturity has been reached across the board before moving on to the next stage of work. Experts and or customers external to the design team are the ones who perform the review. Beyond this high level objective however, reviews can take many forms. The review process for something like the 10 billion dollar James Webb Space Telescope is going to be very different from the review process for a cubesat. 


### Preliminary Design Review (PDR)
    
PDR is the first major "design" checkpoint. This means that an idea for a part has matured into a design for that part. By PDR, you should be able to demonstrate that your design is going to meet all your requirements, at least in theory.     

### Critical Design Review (CDR)
   
In short, your CDR is the last checkpoint before moving on to fabrication, integration, and testing. By CDR, your design should be baselined, and you should be fairly confident that what you're building will work. This usually means plenty of analysis. You should also have a plan for how you are going to manufacture or acquire all your hardware. 


# Operations

<v-divider></v-divider>

This is the domain that I work in. Some engineers design hardware, but someone has to figure out how it's all going to work together. The operations design or functional architecture of a program outlines *how* something will be done. This could be for the benefit of a designer, an operator, or even a computer. Depending on the user, this can also be detailed to different resolutions, ranging from the abstract, to the very specific (like individual command messages). 


# Other Domains

<v-divider></v-divider>

In this post I've mostly talked about requirements, but systems engineering can cover a broad range of specialties. They are all brought together because they apply to the entire project and require lots of integrated thinking. These can include:

1. [Reliability & Availability](posts/reliability)
2. Fault Management
3. Safety & Security
3. Contamination Control

In addition, I've also seen a number of areas which get grouped into systems engineering, although arguably they could belong to any organization:

1. Command and Telemetry Databases
2. Data Architecture
3. Integration
4. Testing
5. Simulation (goes along with planning & operations)




