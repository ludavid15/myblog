---
title: "Model Based Systems Engineering"
topic: "Engineering"
path: "mbse"
author: "David Lu"
date: "2024-12-10"
---

With better computers, engineers have increasingly turned to model based systems engineering, or MBSE as a solution to the engineering process. After all, things like CAD, CFD, and FEM have enabled us to model complex physics, so why not model a project? 


# Introduction

<v-divider></v-divider>

Before jumping into MBSE, I want to preface by saying that the key to understanding MBSE is to first understand databases. At the core of systems engineering is an understanding that all elements of the design are related, and systems engineering is an attempt to track and manage those relationships. 

I think databases provide a good foundation because they teach you to think about relationships. Just like how knowing Micrsoft Word doesn't make you a great writer, the tools of MBSE don't make you a great systems engineer if you don't have a solid understanding of systems. 


## Why MBSE?

The goal of model based systems engineering is to improve upon two things that happen very slowly with traditional requirements documents:

1. A way to track the design baseline.
2. Once a change is made, an easy way to explore how it impacts other systems. 

The primary advantage of using a model is to quickly see connections while keeping a single point of truth. For instance, if the total mass of your spacecraft is an important parameter, everything which references that number can point directly to that parameter. This way, when that parameter gets updated (hopefully in real time), its effect becomes instantly tangible. If you've set up a relational database, this goal should be familiar. 

So that's the first important concept of MBSE - this idea of the model as a series of connections between parameters. The second concept is *visualization*, or how humans actually interface with the model. So far, a series of variables and their connections is easily achievable with a database, or even through lines of code, but neither of these are very accessible to a person. Instead we map the model to visualizations so we can have something useful for our human designers. Operations can be still be shown as flowcharts, hardware can still be shown as block diagrams, and of course we can still fall back on tables and matrices where it makes sense (like with data). The key is that each diagram is not static, but is a connected view *into* the model. 


# The Model

<v-divider></v-divider>

What aspects of a system can we model? Here's a list.

1. Physical Configuration
2. Function/Behavior 
3. Interactions/Data
4. Heirarchies/Definitions


### Physical Configuration

Fairly straightfoward, we need to track the hardware, physical connectors, and physical properties (shape, weight, thermal resistence, etc.). If our project was a sentence, the physical configuration would be the nouns. Physical configuration could also include more analytical properties as well, such as failure modes and reliability. In an operational context, it could also mean the states and modes. 


### Function/Behavior

Verbs. Things that happen. You could say that function is the first thing we choose. Hardware is designed to meet a function, not the other way around.

> Ok technically this isn't always true, as in the case of heritage systems. 

Functions could be high level, like "launch satellite", or low level like "compute checksum".  

### Interactions

Interactions can be very abstract, but are also very important. A function might include an interaction, (i.e. a satellite interacts with a ground station by sending telemetry), but a physical configuration might also include an interaction (i.e. the baseplate on a satellite draws heat away from the electronics). 

And inherent to interactions is data and information. What information is tranferred? How is information formatted? Where does information go?


### Definitions

Definitions explain the words we create to group stuff together. If many pieces of hardware work together to provide telemetry, we might designate a "telemetry subsystem". These abstractions are an important part of communicating complex ideas, but can also get messy. Definitions are applicable to any of the three prior groupings: hardware, functions, and interactions. 


# DoDAF

<v-divider></v-divider>

The Department of Defense Architecture Framework is an effort to generalize how we explain complex systems. Before getting into what DodAF is, let's be clear that DoDAF is not necessarily model based systems engineering. DoDAF only defines a set of "viewpoints", with each viewpoint showing a different aspect of the system. For example, systems viewpoint 4 (SV4) shows functional flow diagrams, while SV1's show a high level overview of the physical elements. 

Consider an analogy - in CAD, we build 3D shapes. When we try to represent them on a 2D screen, we must choose a viewing angle and projection, but there are likely some standard views that everyone expects. Maybe a cross section to show the internal structure, or a profile view if it's a flat plate. DoDAF (and in fact any system diagram) follows the same idea. 

| DoDAF Views   | Explanation
|--             |--
| SV-1          | High level hardware overview
| SV-2          | Detailed hardware overview
| SV-4          | Functional flow diagram
| SV-6          | Resource flow matrix
| SV-10b        | States and Modes transitions
| SV-10c        | Sequence Diagrams
| DIV-1         | Conceptual Data Model
| DIV-2         | Logical Data Model
| DIV-3         | Physical Data Model


### SV-4

This is the functional viewpoint. In contrast to an SV-10c, an SV-4 is the functional model of your hardware, and NOT necessarily your order of operations. You can think of these a bit like a user story. 

In an SV-4, we can either state a heirarchy, (A consists of B, C, D), or we can show it using a flow chart (B, C, and D interact to accomplish A). The first version is known as an SV-4a, and the latter, more complex version is called an SV-4b. 


### SV-6

This is a table of all your producing and consuming functions (and by extension, the performer of that function) for each resource. In a perfectly connected model, these resource interactions should appear on your functional diagrams (SV-4), physical diagrams (SV-1 and SV-2) and your data diagrams (DIV). 


### SV-10c

This is a sequence diagram. In contrast to the SV-4, an SV-10c is not primarily to meant to show the structure of your functions and hardware performers. Instead, an SV-10c tends to be a more explicit (and better) representation of your order of operations. An SV-10c also places greater emphasis on the *messages* and ownership of an operation. For instance, will you provide me an update, or am I responsible for reaching out and asking for it? As such, SV-10c diagrams are great for modeling detailed behaviors.


### DIV

The Data information viewpoint breaks down the heirarchy of data. Like functions, we can think of data both in the abstract, or by implementation. For instance, the attitude of a spacecraft is abstract (DIV-1). A set of quaternions stored into memory is an implementation (DIV-2). Whether those quaternions are stored with any identifying bit headers, or in little or big Endian is physical (DIV-3).

> CAMEO gives us many tools for representing data. Exchange Elements are the default unit, and can be further refined with Signals. For instance, an exchange element might be created called "Power Command", which refines into two signals "Power On" and "Power Off".


# Relationships

<v-divider></v-divider>

A key element of systems modeling is the *relationship* between two elements. Here are a few, presented in no particular order:

### Composition

A composition relationship is a strong relationship, meaning "is a part of". Usually, this means that the child cannot exist independently of the parent. This is akin to defining a non-optional property. For example in a database, each data entry probably needs a key or index. However, the key/index does not exist conceptually without belonging to a data entry (i.e. if there exists a key, the existence of that key implies that there must exist a data entry). 

### Aggregation

An aggregration is also a strong relationship, meaning something like "is made up of" or "includes". In contrast to a composition, the child *can* exist independently of the parent. Usually this is used to indicate that the parent is not the sole container of the child property. I think of this like a foreign key in a relational database. 

### Generalization

A generalization is a weak relationship, meaning "is a type of". For example, a camry and a civic are both types of cars. Element which are specializations of a generalization will *inherit* the properties of the generalization. If all cars have 4 wheels, then a camry and a civic will also have 4 wheels. 

### Association

An association is the weakest type of relationship. It simply means "related to". There is no sharing of properties and doesn't give you much in the way of definition either. I often use these to capture elements which interface with one another, but are otherwise separate. 






