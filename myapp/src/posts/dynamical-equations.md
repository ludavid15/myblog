---
title: "Dynamical Equations"
topic: "Dynamics and Controls"
path: "dynamical-equations"
author: "David Lu"
date: "2021-05-11"
---

We're almost ready to write down F = ma, but before that, we need to define what F is (a force), and what ma is (an inertial term).

# Definitions

<v-divider></v-divider>

## Resultant
The resultant is defined as the sum of force vectors. Useful for consolidating a number of forces into a singular equivalent one.

## Bound Vector
A bound vector contains a direction, magnitude, or well-defined point. A bound vector may also exist on a line of action.

## Moment about a Point
The moment about a point due to a bound vector is defined as the cross product of any position vector from the point to the line of action with the force vector. Only defined for bound force vectors. 

$$M^{F/P}=P^{O/P}\times F$$
 
Where P is the point about which we’d like to take the moment, and O is a point on the line of action. The superscript on M denotes that this is the moment about point P due to a force F.

## Shift Theorem
If we know the moment about a point Q due to a set of forces S with resultant RS, and the position vector from Q to another point P, we can calculate the moment about the point P due to the set of forces RS as:

$$M^{S/P}=M^{S/Q}+P^{Q/P}\times R^S$$

## Couples
A couple is a set of vectors whose resultant is zero

## Torque
A torque is the moment of a couple. Torques are constant regardless of the point around which a moment is calculated, due to the nature of couples and how moments are defined. This can be proved via the shift theorem, by simply setting the resultant equal to zero. 


# Generalized Active Force

<v-divider></v-divider>

The set of generalized active forces are those which are important for determining the dynamics of the problem. The generalized active forces are the set of forces acting on a point dotted with the partial velocities of that point. Recall that there are non-holonomic and holonomic partial velocities, and thus there are likewise non-holonomic and holonomic active forces.

$$F_r=\sum_{i=1}^{v}{ ( ^A V)^P\bullet R^P}\ \ \ \ \ \ \left(r=1,\ \ldots,\ n\right)$$

$$\widetilde{F_r}=\sum_{i=1}^{v}({}^A \widetilde{V})^P\bullet R^P\ \ \ \ \ \ (r=1,\ \ldots,\ p)$$

These two forces are also related using the definition of non-holonomic partial velocities.

$$\widetilde{F_r}=F_r+\sum_{s=p+1}^{n}{F_sA_{sr}}\ \ \ \ (r=1,\ \ldots,\ p)$$

Similar to active forces, active torques and moments are defined by dotting with the partial angular velocity of that body.

$$(F_r)_B=R\bullet{_\ ^A V}^Q+T\bullet{ ^A\omega}_r^B$$

## Non-contributing Forces

These types of forces do not act as part of the set of active forces. There are 4 conditions which allow us to determine which forces are non-contributing.

* Forces exerted on a system S across smooth surfaces of bodies in contact with S, where smooth implies no friction.
* Internal forces between rigidly connected particles of S.
* If B (of S) rolls without slipping on B’ (not a part of S), then all forces exerted by B’ on B are non-contributing
* Forces exerted between B and B’ (both considered a part of S) are non-contributing.

## Equivalent Replacement 
Given a set of forces acting on a rigid body, we define an equivalent replacement force and torque for the system, where the force is the resultant of all the force vectors and acts through point Q, and P is a position vector from Q to the original point of force application.  

$$R=\sum F$$

$$T=\sum{P\times F}$$

## Generalized Inertia Forces
These are the equivalent term given to the idea of inertia (mass x acceleration). For particles, they are defined as the partial velocity dotted with the mass times acceleration.

$$F_R^\ast=\sum{V_r^P\bullet R_i^\ast}$$

$$R_i^\ast=-m_i{ ^A a}^P$$

The equation is slightly different for rigid bodies, since we have to take into consideration the contributions due to angular acceleration.

$$F_R^\ast=V_r^P\bullet R_\ ^\ast+{^A\omega}_r^B\bullet T^\ast$$

$$R_i^\ast=-M_\ { ^A a}^B$$

$$T^\ast=-\sum{mr\times}{ ^A \alpha}_r^P$$

Where r is the position vector from body B to point P. 

# Dynamical Equations

<v-divider></v-divider>

The dynamical equations are the equivalent of stating Newton’s second law, F = ma. These equations simply state that the generalized active forces plus the generalized inertia forces is equal to zero. These are generally integrated alongside the kinematic differential equations to find the state variables. 