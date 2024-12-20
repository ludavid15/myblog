---
title: "Propulsion Roadmap"
topic: "Aerospace"
path: "propulsion-roadmap"
author: "David Lu"
date: "2024-12-10"
---

When it comes to propulsion, it can be difficult to keep track of all the different classifications floating around out there. Props, turboprops, turbojets, ramjets, chemical rockets, nuclear rockets, Hall thrusters, and ion thrusters, just to name a few. If anything, it's a testament to our joint creativity that we've come up with so many ways to *move*. To help clear up some confusion, this section presents a roadmap - a heirarchy of propulsion systems to help you navigate this broad topic. 


To begin, all propulsion systems must achieve the same goal: generate forward momentum. And the only way to do this (that we know of ... ) is to make use of Newton's third law. 

> For every action, there is an equal and opposite reaction.

So that's it. We have to push something back (or push against something), and the action of doing so pushes us forward. Naturally the next question becomes, well how do we push mass back? The three answers we have achieved are:

1. Mechanically, by interacting with the environment.
2. Converting a fluid's internal energy into kinetic energy with a nozzle.
3. If we have access to mass that is charged/magnetized, we can accelerate it with an electromagnetic field.

Other ideas that we have come up with, but cannot achieve yet:

4. Artificial gravity
5. Wormholes (i.e. spacetime warping)
6. Teleporters (technically *not* a form of propulsion, since we're not moving mass from one location to another, but rather assembling a copy somewhere else)

Although not explicitly stated, all relevant propulsion systems work with **fluids**. 

> What is a good measure for efficiency?

<p class=message>
As with most things in life, very little is free. Since the goal is to produce thrust, a common measure of effiency is how much thrust gets produced per unit weight of expendable mass. Naturally, this is not so good a quantifier for something like a battery powered quadcopter, but for anything that must carry fuel or propellent, thrust per mass flow is usually what is meant by "efficiency". 
</p>

# Mechanical Propulsion

This group covers any type of system that captures momentum from the environment, and includes sails and propellers. 

Sails (whether on the ocean or in space) have large surface areas so that when a particle collides with the surface, the particle's momentum is transferred to the sail. 

Propellers operate slightly differently. Power is required to turn the propeller, and as the propeller moves through the fluid, the fluid is accelerated in one direction, and the vehicle is moved in the opposite direction. 

From a force perspective, the fluid's flow over each propeller blade creates a pressure gradient, which can be integrated to find a forward force. 


## Propeller Based Systems

Propeller driven propulsion system are further classified by *how power is supplied*. 

1. **Turboprop and Turbofan** - a jet engine's turbine is used to turn the propeller. Although the jet engine also does produce thrust, the propeller is what's mostly responsible.
2. **Electric Propulsion** - some power source drives an electric motor which turns the propellor. Batteries have poor energy density, which is why you don't often see electric airplanes.
3. **Gas Engine** - relies on good old combustion with cylinders and pistons to turn the propeller.


# Electromagnetic Propulsion

Along with gravity, the weak nuclear force, and strong nuclear force, electromagnetism is one of the four fundamental interactions of the universe. In other words, it doesn't get more general than this. The concept is pretty simple - use electric and magnetic fields to accerate charged particles. Unfortunately, electromagnetism is weird, and this makes things complicated. 

Propulsion systems under this umbrella subdivide into two categories:

1. **Electrostatic** thrusters create a static electric field and accelerate particles from high field potential to low field potential. Gridded ion thrusters and electrosprays use this method.

2. **Electromagnetic** thrusters create a combined electromagnetic field. Hall thrusters use this method.

# Nozzle Propulsion

If you've ever put your thumb over the end of a hose and observed the flow of water increasing in velocity, you've seen a nozzle. Nozzles work by constricting the area through which a fluid can pass. 

From a mass conservation perspective, the fluid velocity must increase so the mass flow rate remains the same (this applies for incompressible fluids).

$$\dot{m} = \rho AV$$

When the velocity increases, the pressure decreases according to Bernoulli's equation (assumptions: adiabatic, incompressible, inviscid, isentropic).

$$P+\frac{1}{2}\rho U^2+gz=constant$$

This point is especially important. Nozzles convert the internal energy (pressure and/or temperature) of a fluid into kinetic energy. Thus to maximize kinetic energy, we would like to increase the internal energy of the fluid *before* it enters the nozzle.


### Increasing the Internal Energy

Things are heating up now as we subdivide nozzle based propulsion systems by the mechanism through which energy is added to a fluid. 


## Electricity

Thrusters of this variety convert power in the form of electricity into thermal energy by heating up the fluid. Your toaster oven at home does this. By passing current through a heating element, some of the electrical power is converted into heat, which radiates and convects to the air around it. This exact method is used in a resistojet. 

> A **resistojet** is a nozzle based propulsion system which adds heat to a fluid by means of a resistor.

Alternatively, if two conducting pieces are placed very close to one another and have a high potential difference between them, current can **arc** through the fluid in between. This action heats up the fluid, and thus we have discovered another type of thruster: the arcjet.

> An **arcjet** is a nozzle based propulsion system which adds heat to a fluid by an electric discharge. 

## Radiation (Nuclear)

Though the word "radiation" may invoke images of nuclear power plants and dangerous x-rays, scientifically speaking radiation simply refers to the transfer of heat through a wave or particle. If you've studied heat transfer, you'll know that radiation via electromagnetic waves is a fundamental mode of heat transfer. Radiation can also exist through particles, such as with the alpha and beta radiation you get when atoms experience radioactive decay. 

In the context of propulsion systems, this energy can be used to **directly** heat up a fluid. Note the important distinction here. We're not using nuclear power to generate electricity to power the engine - heat from the controlled fission reaction goes directly into the propellent. Thus we are firmly still in the word of *nozzle based* propulsion systems. 

The main implementation of this idea takes the form of nuclear thermal rockets. 

> A **nuclear thermal rocket** passes fluid over a nuclear reactor core, which gets heated and then accelerated with a nozzle. 

In rocket applications, nuclear thermal systems have an efficiency and thust in between chemical thrusters, and electromagnetic thrusters. While a few have been developed, this technology never caught on.

In aircraft applications, nuclear systems have been proposed for high endurance applications, but this idea was never realized. 


# Combustion

And finally we've gotten to the biggest bucket of all - combustion based propulsion. That thing which powers our cars and cooks our food, turns out to be pretty reliable for adding heat to fluids. 

But did you know there are actually two modes of combustion? Deflagration is the one most people are familiar with. This is an open flame, or that thing which powers your car. 

The other mode of combustion is known as a detonation. In a detonation, a supersonic exothermic wave expands out, creating a shockwave. Detonations are much louder and less stable than deflagration combustion, but have the theoretical capacity to be more efficient. 

### Detonation Combustion Propulsion

As of today, only two detonation engine designs have been designed and tested. These are the pulse detonation engine, and rotating detonation engine.


### Deflagration Combustion Propulsion

Arguably, the bulk of today's propulsion technology sits in this category. To further subdivide, we merely have to ask the question:

Where do we get the oxygen required for our combustion reaction? If the answer is from the atmosphere, then we have a jet engine. But if do not have this option and must carry all our oxygen onboard, then we have a rocket engine. Due to this constraint, rocket engines are less efficient than jet engines, but that hasn't stopped us from building them bigger!


## Jet Engines

Jet engines have become the backbone of today's aviation industry. Unlike their rocket counterparts, planes have the luxury of flying through the atmosphere, which is full of useful oxygen for combustion reactions. Thus, Jet engines are referred to as "air-breathing". 

The basic jet engine consists of 5 stages.

1. Inlet - slows down incoming air and deals with shockwaves if there's any
2. Compressor - draws in air and slows it down while raising the pressure.
3. Combustion - adds energy to incoming fluid
4. Turbine - collect some power from the flow to drive the compressor
5. Nozzle - converts thermal energy into kinetic energy

Jet engines that follow this model which includes a turbine are known as **Turbojets**

> **Turbojet** - a nozzle based propulsion system, that uses deflagration combustion, where oyxgen for the combustion reaction is pulled from the environment. In order to pressurize air, a compressor is used.

At some point in our quest to move faster, we must cross over into supersonic speeds. In this realm of super fast fluid flow, shocks become an important problem. Luckily, we have a solution: ramjets and scramjets. 

> **Ramjets** - these function like a turbojet, but rely on the incredibly fast forward speed of the vehicle to compress incoming air. Thus, ramjets do away with the compressor and turbine stages, but do not generate any thrust on their own unless the vehicle is already moving.

> **Scramjets** - short for supersonic combustion ramjet. Virtually identical in functionality to a ramjet but instead of slowing the flow down to supsonic speeds for combustion, scarmjets keep the flow supersonic. This makes combustion very complicated but at **very** high speeds, slowing incoming air down all the way just isn't very efficient.


## Rocket Engines

And last but not least, we have rockets. Rockets engines are a nozzle based propulsion system, that relies on a deflagration combustion reactions to add thermal energy to a fluid. Additionally, rockets carry their own oxidizer onboard.

So how do we subdivide rocket engines? Well how about by the way in which propellent is stored? If both fuel and oxidizer and mixed together in a solid, that's a solid rocket motor. 

> **Solid rocket motor** - not all that different from an explosive, but simple, cheap, and reliable. These things are what you find in hobby rockets, but can be scaled up to power things like the space shuttle. 

If (fuel xor oxidizer == liquid), then we have a hybrid rocket engine

> **Hybrid rocket motor** - these allow for more control than a solid rocket motor, but are a step up in complexity. 

Lastly, if both the fuel and oxidizer are liquid, then we have a liquid rocket. 

### Liquid Rockets

If you've ever seen a big rocket launch, most likely it was a liquid rocket. The Falcon 9, Atlas, Delta, and Space Shuttle are all examples. The primary advantage of these systems is their control. A series of pumps and valves moderate the flow of both oxidizer and fuel into the combustion chamber, thus allowing for operators on the ground to control the thrust. This is a necessary component if you want to attempt manuevers like propulsively landing your rocket. 

Liquid rockets are further classified by the way in which propellent is fed into the combustion chamber. 

**Pumps** are a common way and provide a nice amount of control. 

> **Pump-fed systems** are classified into open loop systems, and closed loop systems.

**Pressure** can also be used to push propellent along the lines. 

> **Pressure-fed systems** are classified based on the source of pressure. Some propellents automatically sublimate and create pressure. These systems are autogenous. Alternatively, a third gas (usually a non-reactive nobel gas) can be used. 

A short addendum to the rockets category is **monopropellant** engines. 

> **Monopropellant engine** - these do not technically use combustion, but instead rely on an incredibly exothermic chemical decomposition reaction. Hydrazine (NH4) is a popular choice. 

# Summary

And there you have it! If you've followed along all this way, we've gone over about 20 different propulsion systems, ranging from tiny electrosprays to enormous liquid rocket engines. Hopefully you've gained a better understanding for the fundamental principles that drive propulsion technology. 

Personally, I think roadmaps like this are important for visualizing gaps (now there's a loaded systems engineering word for ya) in our research and development. A question like "what propulsive technologies are we missing?" is much more difficult to answer comprehensively than something like "how can we add heat to a fluid?". 

