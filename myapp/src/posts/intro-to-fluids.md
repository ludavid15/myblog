---
title: "Intro to Fluid Mechanics"
topic: "Fluid Mechanics"
path: "into-to-fluids"
author: "David Lu"
date: "2021-05-12"
preview: "A high level perspective on what fluid mechanics is, and what the sub-disciplines are."
---

When we talk about fluid mechanics, we aren't just talking about the second state of matter (liquid $\subset$ fluid). Fluid mechanics is the study of *flow*, which applies to both liquids and gases. Also, we're only dealing with **Newtonion fluids**. Non-newtonian fluids are weird, and I haven't studied them, so there won't be anything about them here. It's important to mention that classic fluid mechanics is treated as a subset of continuum mechanics. This is known as an engineering model - a set of assumptions we make to simplify real-life.

<v-alert
    border="start"
    border-color="secondary"
    elevation="2">
    Continuums are characterized by the existence of shear, and by being continuous (duh). 
</v-alert>

But watch out! When the density is really low, (such as in space) the continuum assumption falls apart, at which point we must switch over to molecular dynamics. This is an important rule to remember generally speaking - each equation we develop comes with it's own set of assumptions that must be true or else our equation isn't valid. 

### Newtonian Fluid

A Newtonian fluid has a linear relationship between stress and strain rate. Non-newtonian fluids have non-linear relationships. 

# Fundamentals

<v-divider></v-divider>

In general, we want to find the following properties as a function of location and time:

1.	Pressure
2.	Temperature
3.	Density
4.	Velocity
5.	Acceleration

With the above information, we can find things like lift, drag, work, & heat transfer (all very important for engineering applications). In a complete model, all 5 of these properties are closely related. Not surprisingly, it’s also difficult to solve for all 5 properties at once. Thus, the subject of fluid mechanics is further broken up into categories based on assumptions and simplifications. These assumptions allow us to make certain variables independent of other variables. The three most important “categories” are:

1.	Incompressible vs Compressible
2.	Inviscid vs Viscid
3.	Laminar vs Turbulent

Any combinations of the above labels are technically possible. Here are a few examples, and the respective sub-domains you get:

1.	Compressible, Inviscid, Laminar = Shocks, expansion waves, acoustic waves
2.	Compressible, Viscid, Turbulent = Turbulent boundary layers, supersonic wakes
3.	Compressible, Viscid, Laminar = Hypersonic boundary layers
4.	Incompressible, Inviscid, Laminar = Potential flow theory
5.	Incompressible, Viscid, Laminar = Creeping flow, boundary layer theory

To solve problems in fluid mechanics, we can borrow laws and theories that traditionally fall under other disciplines. Some examples:

1.	Thermodynamics
2.	Conservation Equations
3.	Gas Laws
4.	Continuum Mechanics

And finally, we can make assumptions which are imposed as additional contraints. Common assumptions come from thermodynamics: isentropic, isobaric, isochoric, isothermal, steady, etc.

## Viscosity

The viscosity of a fluid $\mu$ defines the relationship between stress and strain. In most cases, we assume that the fluid is a Newtonian Fluid, meaning its stress and strain are related linearly. Here it is in two dimensions:

$$
\tau=\mu\left(\frac{\partial u}{\partial y}+\frac{\partial v}{\partial x}\right)
$$

$$
Friction\ Force=\mu\nabla^2\vec{V}=\nabla\tau
$$

We can also define the second coefficient of viscosity as λ.

$$
\xi=\lambda+\frac{2}{3}\mu
$$