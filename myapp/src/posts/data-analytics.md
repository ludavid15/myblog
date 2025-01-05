---
title: "Data Analytics"
topic: "Engineering"
path: "data-analytics"
author: "David Lu"
date: "2024-12-10"
---

In contrast to data *science*, which designs and explores the models and algorithms we have for analyzing data, data *analytics* is about using data to solve problems. This includes additional steps like considering your stakeholders, communicating ideas, and working under a deadline. This post is a collection of notes and lessons from the Google Data Analytics Certificate.

# The Lifecyce of Data. 

<v-divider></v-divider>

Why do we discuss the lifestyle of data? Because data analytics is not just about obtaining results, it's about collecting, managing, and then closing out a process. 

1. Plan
2. Capture
3. Manage
4. Analyze
5. Archive
6. Destroy

Each step comes with its own unique set of challenges. For example, how do you collect and store data securely? How do you use is ethically? How can you account for bias?

# Setting up the Problem

<v-divider></v-divider>

The best results come from a well defined question. This means it should be:

1. Specific
2. Measurable
3. Action-oriented
4. Relevant
5. Time constrained

And finally, it's also worth considering the type of problem. Which of these are you trying to do?

1. Predict
2. Categorize
3. Detect outliers
4. Identify themes
5. Discover connections

Different objectives may lead to different problem setups and approaches. The better you understand what you are trying to do, the more tailored you can make your response. 

# Types of Data

<v-divider></v-divider>

1. Nominal vs Ordinal 
    1. Nominal - Choices/responses that don’t have a particular order (i.e. yes/no/maybe)
    2. Ordinal - Data that has an associated order (i.e. a scale or ranking).
2. Internal vs External (i.e. who owns the data? Does it come from outside your organization?)
3. Continuous vs Discrete
4. Quantitative vs Qualitative
5. Structures vs Unstructured (i.e. survey responses, vs pictures)
6. Primary vs Secondary


## Data Modeling

<v-divider></v-divider>

These types of data modeling are actually pretty universal. The DoD Architecture Framework (DoDAF) also includes the following three models, known as a DIV-1, 2, and 3 respectively. 

1. **Conceptual data modeling** gives a high-level view of the data structure, such as how data interacts across an organization. For example, a conceptual data model may be used to define the business requirements for a new database. A conceptual data model doesn't contain technical details. 
2. **Logical data modeling** focuses on the technical details of a database such as relationships, attributes, and entities. For example, a logical data model defines how individual records are uniquely identified in a database. But it doesn't spell out actual names of database tables. That's the job of a physical data model.
3. **Physical data modeling** depicts how a database operates. A physical data model defines all entities and attributes used; for example, it includes table names, column names, and data types for the database.


# Data Integrity

<v-divider></v-divider>

Data integrity is something to keep in mind through the entire data analysis process. Data with integrity means that is accurate, complete, consistent, and trust-worthy. 

One common pitfall is to have biased data. This can occur if you're using a survey to collect data and use leading or vague questions. Some examples:
* Isn't it true that A had a negative effect on B?
* What's going on with A?

Other common pitfalls of the data cleaning process:

1. Overlooking missing values
2. Only looking at a subset
3. Losing track of objectives
4. Not fixing the root of the issue
5. Not analyzing the system
6. Not backing up your data prior to cleaning
7. Not accounting for cleaning time in budgeting
8. Not checking for spelling errors
9. Forgetting to document errors
10. Not checking for misfielded values

Speaking from personal experience, another easy to miss aspect of data integrity is redundancy. If you're managing a large and diverse set of tables, you'll want to do your best to map out the relationships and generally cleanup any overlap. For example, there should be a single point of truth which maps customer ID's to their emails. It'll help in the long run to have this single table which you query from, rather than a set of unlinked tables which all may duplicate the same information. 

# Analysis

<v-divider></v-divider>

This is a bit tough to describe, because the analysis you perform is going to be different depending on your application. But in general, you'll have a few toolsets you can use. For smaller databases, excel is perfectly sufficient. For anything larger, you'll want to look at SQL, R, or some other coding language such as Python. Personally, I like using Python with the Pandas library. 

# Visualization

<v-divider></v-divider>

Once you've analyzed your data and drawn conclusions, the next step is to turn your insights into actions, which will require you to communicate your ideas. 

Principles of good data visualization:

1. Information
2. Story
3. Goal
4. Visual Form

You can also review your presentation with these questions:

1. What is the practical question?
2. What does the data say?
3. What does the visual say?

Finally, make sure to consider the use case. For instance, if we need to monitor new data as it comes in, an interactive dashboard with the proper backend support would be best (e.g. Tableau). However, if we wanted historical data, a dashboard could be too complex and now worth the effort. 

