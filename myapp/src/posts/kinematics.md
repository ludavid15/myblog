---
title: "Kinematics"
topic: "Dynamics and Controls"
path: "kinematics"
author: "David Lu"
date: "2021-05-10"
preview: "A subset of dynamics, where forces are neglected, and we focus instead on the motion of points and rigid bodies over time."
---

A subset of dynamics, where forces are neglected, and we focus instead on the motion of points and rigid bodies over time. At the core of this topic are a series of rules about positions, velocities, accelerations, and how to find them amid a potentially messy system of reference frames and motion constraints. 

# Derivatives

<v-divider></v-divider>

In the world of 3D dynamics, derivatives get complicated. This is largely due to reference frames. We'll indicate a vector's reference frame with a prescript. 

For example, ${}^A V$ indicates that the vector V is defined with respect to reference frame A. 


## Derivative of a Vector

The derivative of a vector must always be defined with respect to some reference frame. Given a reference frame A, and basis vectors $\alpha_i$, and measure numbers $V_i$, the derivative of vector V in frame A is defined as:

$${}^A\frac{dV}{dt}=\sum\frac{dV_i}{dx}\alpha_i$$

Thus, one way to take the derivative of vector V is to express the vector in terms of the A basis vectors first, and then derive the measure numbers. 


## Angular Velocity

The angular velocity is defined as a vector function such that the cross of it with any vector fixed in the frame yields the derivative of that vector in a new frame. Let's break this down a little bit. 

1. Define a world frame **A**, and local frame **B**. 
2. Define a vector $b_1$, that is fixed in **B**, and defined in **B** (understand the difference between fixed in **B** vs defined in **B**).
3. An angular velocity term relates the original vector defined in B, to it's velocity defined in A.

In other words, the angular velocity describes the rotation of one frame in another. 

$${}^A \omega^B \times V= {}^A \frac{dV}{dt}$$

Where the the above notation indicates that $\omega$ is the angular velocity of frame B defined in frame A.

$${}^A \omega^B = b_1 (\dot{b_2} \bullet b_3 )+ b_2 (\dot{b_3} \bullet b_1 )+b_3 (\dot{b_1}\bullet b_2)$$


This is a convenient tool for finding the derivative of a vector without first doing a complex change of reference frame calculation. Angular velocities can be added linearly. That is:

$${}^A\omega^D=\ {}^A\omega^B + {}^B\omega^C + {}^C\omega^D$$

Angular velocities can also be taken in inverse by applying a negative value in front:

$${}^A\omega^B=\ - {}^B\omega^A$$


## Rules about Derivatives

There are a few rules to keep in mind when taking derivatives of vectors. First, it is that the order of differentiation matters when taking a double differential. That is to say,

$${}^B \frac{d}{dt}\left({}^A \frac{d}{dt}V\right)\neq {}^A\frac{d}{dt}\left({}^B\frac{d}{dt}V\right)$$

Some other rules are shown below for differentiation of sums and products

* Derivatives of a sum are distributed

$${}^A\frac{d}{dt}\left(V_1+V_2\right)=\ {}^A\frac{d}{dt}V_1+{}^A\frac{d}{dt}V_2$$

* You can pull out a scalar multiplier

$${}^A\frac{d}{dt}\left({sV}_1\right)=\ {}^A\frac{ds}{dt}V_1+s{}^A\frac{d}{dt}V_1$$

* Use the product rule when dealing with vector dot products (also known as an inner product).

$${}^A\frac{d}{dt}\left(V\bullet W\right)=\ {}^A\frac{dV}{dt}\bullet W+V\bullet{}^A\frac{dW}{dt}$$

* Also use the product rule with dealing with vector cross products (a.k.a. outer product), but note the change in operation order.

$${}^A\frac{d}{dt}\left(V\times W\right)=\ {}^A\frac{dV}{dt}\times W+{}^A\frac{dW}{dt}\times V$$


## Simple Angular Velocity

If there is a vector (k) fixed in both frame A and frame B over an interval of time, then B is said to have simple angular velocity in A during that time interval. This simplifies the expression of the angular velocity of B in A to:

$${}^A\omega^B=\ \dot{\theta} k$$

Where \\( \theta \\) is an angle defined around the common axis, and k is a unit vector in the direction of the axis defined in A. This is a more precise way of defining the case where an “axis” of rotation may exist, but note that generally speaking, an axis does not need to exist for us to be able to define an angular velocity.

> Interestingly, Euler's Rotation Theorem states that in three-dimensional space, any displacement of a rigid body such that a point on the rigid body remains fixed, is equivalent to a single rotation about some axis that runs through the fixed point. This leads to the idea of a "group" - a mathematical structure which all rotations must follow. This 3D rotation group is known as SO(3). In matrix representation, this is any orthogonal 3x3 matrix with determinant 1. 


## Derivative in Two Reference Frames

The derivative of the same vector with respect to two different reference frames A and B can be related by the angular velocity of B in A. 

$${}^A\frac{dV}{dt}=\ {}^B\frac{dV}{dt}+{}^A\omega^B\times V$$

Where V does not have to be a vector fixed in B. Note that if V is fixed in B, the derivative of V with respect to B goes to zero, leaving just the cross product of the angular velocity and V yielding the derivative in A. 


## Angular Acceleration

The angular acceleration of a vector is defined as the derivative of an angular velocity vector function in *any frame*. Note that the frame in which we take the derivative does not matter. 

$${}^A\alpha^B=\ {}^A\frac{d}{dt} {}^A\omega^B = {}^B\frac{d}{dt} {}^A\omega^B$$

We can prove this second fact by applying the rule of differentiation in two reference frames, noting that a vector crossed by itself is always equal to zero.

$${}^A\frac{d\omega}{dt}=\ {}^B\frac{d\omega}{dt}+{}^A\omega^B\times{}^A\omega^B$$


# General Velocity and General Acceleration

<v-divider></v-divider>

To define general velocity, we need to define a position vector. A position vector must start from a fixed point in the frame of differentiation. Any fixed point can be taken, as long as it is in the frame.

$${}^AV^P=\ {}^A\frac{d}{dt}P^{P/N}$$

The above is an expression for the velocity of point P in the reference frame A, where the vector P goes from point N fixed in A to a point P not fixed in A. The definition of acceleration of point P in frame A is then found by taking the second derivative of the velocity vector.

$${}^Aa^P={}^A\frac{d}{dt}{}^AV^P$$

## V2PTS and A2PTS

Consider two points (P and Q) fixed in a rigid body B, that has some angular velocity in frame A. We can relate the velocities of these two points in frame A as:

$${}^AV^Q= {}^AV ^P+ {}^A \omega^B \times R^{Q/P}$$

Where R is a vector that points to Q from P. Similarly, we can relate the acceleration of these points if we know the angular acceleration of body B in frame A.

$${}^Aa^Q={}^A a^P+{}^A\omega ^B \times ( {}^A\omega ^B \times R^{Q/P})+{}^A \alpha^B \times R^{Q/P}$$

## V1PTS and A1PTS

Consider a point P that has some velocity in frame B. Frame B itself moved with angular velocity in a reference frame A. The velocity and acceleration of point P in frame A is defined as:

$${}^AV^P={}^AV^{B_p}+{}^BV^P$$

$${}^Aa^P={}^Aa^{B_p}+{}^Ba^P+2{}^A\omega^B\times{}^BV^P$$

Where \\( B_p \\) is defined as a point of B coincident with P at some time, t*. This is convenient because we can define \\( B_p \\) to be stationary in B. 


# Configuration Constraints

<v-divider></v-divider>

Consider a system of points, where each point is defined by position vector, where each vector has three measure numbers. A constraint configuration constraint is a function of these measure numbers that is equal to zero. Configuration constraints are also known as “holonomic constraints”.

$$P_1,P_2,\ldots,\ P_n\rightarrow vectors$$

$$f\left(P_{11},\ P_{12},\ P_{13},\ldots,\ P_{n1},\ P_{n2},P_{n3}\right)=0$$

Next, we are going to define what are known as generalized coordinates and speeds. The main objective of this function is to simplify later when we have to define and solve the F = ma equation.

## Generalized Coordinates

Instead of using configuration constraints, we can define a set of (n) generalized coordinates. The total number of generalized coordinates is equal to:

$$n=3v+6\eta-m$$

Where v is the number of points, $$\eta$$ is the number of rigid bodies, and m is the number of configuration constraints we have defined in the original problem. Generalized coordinates are usually defined with the letter q.

$$q_1,q_2,q_3,\ldots q_n$$


## Generalized Speeds

Generalized speeds are defined as linear combinations of the time derivative of the generalized coordinates. We define these both with the sum notation, and in matrix notation. 

$$u_r= \sum_{s=1}^{n}{Y_{rs}{\dot{q}_s}+Z_r}\ \ \ \ \ \ r=(1,\ \ldots n)$$

$$u=Y\dot{q}+Z$$

Thus, we can also invert the matrix expression to arrive at an expression for the kinematic differential equations as follows:

$$\dot{q}=Y^{-1}u-Y^{-1}Z$$

Generalized speeds are useful because they give us the flexibility to simplify our expression for velocity. We define as many as are necessary to fully describe the problem. 


## Motion Constraints

The motion constraints can be created by separating the generalized speeds into a series of dependent and independent generalized speeds. We denote the first 1 through p speeds as the independent speeds, and p+1 through n as the dependent speeds. The dependent speeds are linear combinations of the independent speeds. The number of independent speeds, p, is also referred to as the degrees of freedom. 

$$u_1,u_2,\ldots,\ u_p,\ u_{p+1},\ldots,\ u_n$$

$$u_r=\ \sum_{s=1}^{P}{A_{rs}u_s+B_r}\ \ \ \ \ r=(p+1,\ \ldots,\ n)$$

Motion constraints are referred to as “non-holonomic constraints”, but this is distinct from the “holonomic” constraints we used to define coordinate constraints (very confusing).

# Partial Angular Velocities and Partial Velocities

<v-divider></v-divider>

The partial angular velocities are defined as those that when multiplied by the generalized speeds produce the original angular velocity expression. Note that there is a remainder term at the end. There are (n) total partial angular velocities. When motion constraints are applied, there are only (p) partial angular velocities – one for every generalized speed. 

$${}^A\omega^B= [{}^A\omega_1 ^B,\ \ldots,\ {}^A\omega_n^B] \begin{bmatrix}u_1\\\ldots\\u_n\\\end{bmatrix}+w_t$$

$${}^A\omega^B= [{}^A \tilde{\omega}_1^B,\ \ldots, {}^A \tilde{\omega}_p^B ]  \begin{bmatrix}u_1\\\ldots\\u_p\\\end{bmatrix} + \tilde{w}_t$$

The partial velocities are defined in much the same way. 

$${}^A V^B= [{}^AV_1^B,\ \ldots,\ {}^AV_n^B ] \begin{bmatrix}u_1\\\ldots\\u_n\\\end{bmatrix} +V_t$$

$${}^AV^B= [{}^A \widetilde{V}_1^B,\ \ldots,\ {}^A \widetilde{V}_p^B ] \begin{bmatrix}u_1\\\ldots\\u_p\\\end{bmatrix}+\widetilde{V}_t$$

The partial angular velocities can be derived by using our previous definition of the angular velocity in terms of the basis vectors and their derivatives.

$${}^A\omega^B=b_1(\dot{b_2}\bullet b_3)+b_2 (\dot{b_3}\bullet b_1 )+b_3 (\dot{b_1}\bullet b_2)$$

$$\frac{ ^AdV}{dt}= \begin{bmatrix}\frac{\partial V}{\partial q_1}&\ldots& \frac{\partial V}{\partial q_s}\\\end{bmatrix} \begin{bmatrix} \dot{q}_1\\\ldots\\\dot{q}_s\\\end{bmatrix} +\frac{^A\partial V}{\partial t}=\frac{\partial V}{\partial q}\dot{q}+\frac{^A\partial V}{\partial t}$$

$$\dot{q}=Wu+X$$

$${}^A\omega^B=\left[b_1\frac{\partial b_2}{\partial q}\bullet b_3+b_2\frac{\partial b_3}{\partial q}\bullet b_1+b_3\frac{\partial b_1}{\partial q}\bullet b_2\right]\left(Wu+X\right)+\frac{^A\partial b_1}{\partial t}+\frac{^A\partial b_2}{\partial t}+\frac{^A\partial b_3}{\partial t}$$

$${}^A\omega^B=\left[~\right]Wu+\left[~\right]X+\frac{^A\partial b_1}{\partial t}+\frac{^A\partial b_2}{\partial t}+\frac{^A\partial b_3}{\partial t}$$

We now have an expression for the angular velocity which satisfies the format we’ve already defined for the partial angular velocities. Take care to notice everything that goes into the remainder term. 

But why define partial angular velocities at well? Well, in a full dynamics problem, we'll frequently encounter a situation in which an applied force causes a resultant acceleration/velocity in one direction, but not in another. Partial velocities allow us to separate each F = ma statement by direction, greatly simplifying each equation.


## Partial Acceleration and Partial Velocities

This is basically the projection of accelerations into the partial velocities. Doing so, we'd see that it connects to the same result as in Lagrange’s Method. More info on this topic may come in the future.
