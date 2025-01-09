---
title: "Agile Methodology"
topic: "Miscellaneous"
path: "leadership"
author: "David Lu"
date: "2022-06-14"
preview: "A few notes on the Agile method for engineering, based on on my own experience working on an agile team and Google's Agile Project Management class on Coursera."
---

A few notes on the Agile method for engineering, based on on my own experience working on an agile team and Google's Agile Project Management class on Coursera.


# Personal Impressions of Agile

<v-divider></v-divider>

Before getting into the details, just a few of my personal impressions on agile and scrum. 

1. Agile is all about trusting in people. It's the belief that capable individuals will deliver better products. To this end, everything in agile is designed to make individuals feel empowered, supported, and motivated. It encourages people to think for themselves, and to think critically, instead of relying on tradition.
2. In the absense of process and planning, something is needed to guide people towards an objective. This is achieved by literally that - a core principle of agile is that the objective is more important than any plan or process designed to get you there. 
3. Ironically, rules or processes designed to promote agile can be inherently un-agile. Agile is a culture, not a process. 
4. Agile can lead to power imbalances. A lack of formal process usually means that those who are loudest/most senior get their way. Rules and processes might slow down a project, but they also protect people who may otherwise be overlooked. As with all things, there's a balance to be struck. 


# VUCA

<v-divider></v-divider>

Before adopting an agile product management strategy, consider if agile is right for your project. An easy acronym to use for this is VUCA, which stands for:

* Volatility - rate of change in an industry
* Uncertainty - lack of predictability
* Complexity - high number of interelated forces
* Ambiguity - lack of definition

Agile is best suited for projects that have high VUCA (volatility, uncertainty, complexity, and ambiguity). In constrast, if you are working in an industry that is steady, well-defined and simple, waterfall may be a better strategy. 


# Scrum

<v-divider></v-divider>

Scrum is a framework (alongside things like Kanban, XP, or lean) that implements the principles of agile. Within a Scrum organization, there are three roles.

1. The **Product Owner** acts like the customer, and sets the content of what to make. The product owner also prioritizes the backlog and promotes transparency with the development team.
2. The **Development Team** builds the product. A team should be self-organized, customer-oriented, and cross-functional. 
3. The **Scrum Master** facilitates the team and helps them work better (mostly through the practice of agile principles).


## Backlog

The backlog is an outline of all the work there is to be done. For each item, consider adding a priority level, work estimate, and value added metric. The product owner is typically responsible for keeping the backlog updated and sorted. 

Descriptions of each item are usually presented as a "user story". This is an effective way to define tasks because it describes the "what" without stipulating the "how". This gives the development team ownership of the task, and ensures they keep vision of the goal, and not get bogged down by following a set of instructions. In systems engineering terms, this would be like using the validation field of a requirement in place of the requirement itself.  

To judge an effective user story description, consider if it is:
1. Independent - completion of this story is not dependent on another one
2. Negotiable - leave room for change
3. Valuable - should clearly explain the value delivered
4. Estimable - should have a clear definition of done so it is estimable
5. Small - should be completable within a single sprint
6. Testable - is specific enough to verify

User stories often follow the structure of:

As a **user**, I want to **action** so that I can **value**. 

And once again just because it's really important, stories should be **testable** for the use case in which it is valuable. If it's not, you might be in a "fake" agile situation - a fascimile which only mimics the surface appearance, but misses the deeper point. 


## Sprints

In scrum, the workflow is broken up into periods called sprints. At the start of every sprint, we set an objective (based on past velocity) about what we will accomplish. We work towards that goal, and then at the end we review our product and process. The review is an especially important piece of the sprint since that's what allows us to make improvements. There are four meetings to complete a sprint:

<v-card variant="tonal" class="mb-5">
    <v-card-title>
    Planning
    </v-card-title>
    <v-card-text>
    The planning meeting is where you vote on story points, assign, and prioritize stories. There's a lot of ways to do this, but for small to medium size backlogs, you can just vote as a team.
    </v-card-text>
</v-card>

<v-card variant="tonal" class="mb-5">
    <v-card-title>
    Review
    </v-card-title>
    <v-card-text>
    The review meeting is where you reflect on the technical content of what you accomplished. It's the "what" of your tasking. This is your chance to figure out if you accomplished your sprint goal. 
    </v-card-text>
</v-card>

<v-card variant="tonal" class="mb-5">
    <v-card-title>
    Retrospective
    </v-card-title>
    <v-card-text>
    The retrospective is concerned about *process*. The goal is to improve the "how" of what you do, so you can do it better next time. 
    </v-card-text>
</v-card>

<v-card variant="tonal" class="mb-5">
    <v-card-title>
    Backlog Refinement
    </v-card-title>
    <v-card-text>
    The backlog refinement is the chance for everyone to get on the same page about what's in the backlog. It's important for the dev team & scrum master to understand the objective of each task set by the product owner. 
    </v-card-text>
</v-card>


## The Daily Standup

I think the key to a useful and effective standup meeting is to priotize *actions*, rather than *statuses*. For example, don't describe a task as "in progress" or "blocked". Describe the actions you took, or plan to take. Too much status and it begins to feel like a status report to your manager, rather than as an opportunity to raise issues. 


## Pitfalls

Here are a few pitfalls, which can derail the original design intent of some agile practices (and remember, following a process without knowing the reason is step number one towards bad design and delays).

1. Velocity measures the average sprint pace. This assumes that in each sprint we are completing the tests needed to deliver a completed story. If we're pushing the testing out, then it's likely that our velocity eventually plateaus. 
2. Velocity is NOT a measure of total team performance, and it shouldn't be. Ultimately what matters is the value delivered. Not to mention that this practice can create some really bad work cultures. 
3. Scrum makes use of user stories because they keep the team focused on the end product, and allow room for innovative solutions. Unless you're on a service team, you should focus on the "why" of your goals, and not the "how". 

## Other Tips and Tricks

A collection of other tips and tricks I've learned as scrum master.

1. For retrospective meetings, consider asking people to write down their thoughts in a public location before the meeting. This forces people to come to the meeting with comments already in mind, rather than coming up them the spot. Make sure that if you do this though, that you're still having a discussion at the actual retrospective.
2. Consider using the sailboat or rose/thorn method to guide retrospective discussions. This approach is best for when you lead a team that isn't very good at self-reflection or isn't very outspoken (e.g. the only comments you get at retrospective is "ya things went well I had no blockers"). These teams need a helping hand to guide them along. 
3. If you use story points, resist the urge to treat them as a measure of engineering hours, or as a way to quantify work done. They are meant to be a relative measure of difficulty. This eliminates the question of "shouldn't a ticket be weighted differently if it's for a senior dev vs a junior dev?" The answer is that a 5 point task is more complex than a 3 point task, regardless of who is working on it. 
4. Since story points do not track engineering hours, we should avoid the urge to split a ticket at the end of a sprint to capture any "partial work" that was completed. If a task remains uncomplete, you should move the task into the backlog to be reviewed in the next sprint. This aligns better with the agile principle that hours worked is not inherently valuable, only **delivered** value is valuable. 


# DevOps

<v-divider></v-divider>

DevOps is an approach to software engineering that brings together the development team with the operations support team. The goal of this collaboration is to build a more direct path between the two. 


# Scaling Agile

<v-divider></v-divider>

Since scrum teams work best for groups of 5 to 10 people, larger product teams need an adapted agile system. Common big-group agile structures include: 

1. Scaled Agile Framework (SAFe)
2. Scrum of Scrums
3. Large Scale Scrum (LeSS)
4. Disciplined Agile Delivery (DAD)
5. Spotify Model (of Squads, Tribes, Chapters, and Guilds)

But in general, it's important to remember that Agile is all about being flexible to deliver value. These frameworks are NOT meant to be definitive instruction manuals or a process to be followed. Instead, seek a balance of strategies and values that work best for your particular situation. 