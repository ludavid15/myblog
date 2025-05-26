---
title: "Trajectory Optimization"
topic: "Dynamics and Controls"
path: "trajectory-optimization"
author: "David Lu"
date: "2021-06-10"
preview: "In this article, I talk about how to frame a trajectory problem as a mathematical optimization problem. Keep in mind that this is only one way to plan a trajectory. And when I say math, I really do mean *math* (the difficult kind). You have been warned."
---

In this article, I talk about how to frame a trajectory problem as a mathematical optimization problem. Keep in mind that this is only one way to plan a trajectory. And when I say math, I really do mean *math* (the difficult kind). You have been warned.

To begin, let's connect the physical properties of a trajectory, to the inputs of any optimization problem. 

* Trajectories occur in 3D dimensional space, meaning that there should be x(t), y(t), and z(t).
* The variables to be optimized are the control inputs as a function of time. That is, u(t). 
* Trajectories are continuous time problems. Problems can be solved as continuous time or can be discretized and solved as a finite dimensional optimization problem. 
* There are equations of motion which govern the effect of the control input u to the state variables x. 

# Problem Statement for Generic Optimization 
The problem statement in flight trajectory optimization is a specialized version of the problem statement for a generic optimization problem:

$$J=K\left(t_1,\ x_1\right)+\int_{t_0}^{t_1}L\left(t,x,u\right)dt$$

Where K is known as the terminal cost, while L is known as an incremental cost. The one in the subscript indicates the value at the final time. The problem is subject to equations of motion, equality constraints, and inequality constraints. 

$$\dot{x}=f\left(t,x,u\right)$$

$$g\left(t,x,u\right)=0$$

$$h\left(t,x,u\right)\le0$$

## Solution Strategies
There are three approaches for solving a continuous time trajectory optimization problem. These are:

1. Dynamic Programming* – using sufficient conditions to derive a control law (i.e. a function of the state and time).
2. Indirect Methods – apply Pontryagin Maximum Principle (which provide necessary conditions) and solve the resulting two-point boundary value problem. 
3. Direct Methods – discretize the trajectory and solve as a constrained finite dimensional optimization problem. This is also known as transcription. 

*Note that dynamic programming can also be used to solve discrete (i.e. finite dimensional optimization problems). The principle of both is the same, just with slightly modified steps. 


## Discrete Time Optimal Control Problems

In a discrete time optimal control problem, the trajectory is divided into a series of nodes, where at each node the vehicle has some state (i.e. position, velocity, angle, etc.) and control input. The problem statement can be rewritten in the following form:

$$J=K\left(x_N\right)+\sum_{k=0}^{N-1}{L(x_k,u_k,k})$$

$$x_{k+1}=f(x_k,u_k,k)$$

The set of necessary conditions can be expressed as follows

$$p_k=\nabla_{x_k}H_k$$

$$\nabla_{u_k}H_k=0$$

$$p_N=\nabla_{x_N}K(x_N)$$

If the Hamiltonian is convex in u, then the stationary condition becomes necessary and sufficient for the optimal control sequence to a pointwise minimizer of the Hamiltonian.

## Collocation

This is a discretization method whereby the trajectory is divided into nodes, and both the state variables and controls are free (i.e. to be optimized by the optimizer). The state variables are chosen such that they equations of motions are satisfied. The total number of design variables is expressed below:

$$X=\left[\begin{matrix}x_o\\\vdots\\x_N\\u_o\\\vdots\\u_{N-1}\\\end{matrix}\right]$$

In the above expression, u is the control vector at every node, while x is the state vector at every node. There can be multiple values within a single state vector or control vector (i.e. position and velocity in 3D space = 6 variables in each state vector). The equations of motion are applied as equality constraints on the components of the input vector.

## Shooting Methods
Whereas collocation methods approximate the trajectory curve, shooting methods are simulation based. There are two types of shooting methods: single shooting, and multiple shooting. Single shooting estimates the entire trajectory as one arc, while multiple shooting approximates the trajectory as a spline of multiple arcs, and then must satisfy continuity and constraint equations to join those arcs together. 

Classification of Optimal Control Problem Types
Problems formatted in one type can be transformed into another format fairly easily.

### Mayer’s Problem
A variation of optimal control problem where there is no incremental cost

$$J=K(x(t_1),\ t_1)$$

### Lagrange’s Problem
A variation of optimal control problem where there is no terminal cost

$$J=\int_{t_0}^{t_1}L(t,x,u)dt$$

### Bolza’s Problem
The optimal control problem where neither the terminal nor incremental cost are zero.

$$J=K(t_1,\ x_1)+\int_{t_0}^{t_1}L(t,x,u)dt$$
 
# Pontryagin Maximum Principle
PMP provides a series of necessary conditions for continuous time optimal control problems. These principles bear a strong resemblance to the KKT necessary conditions. There are four components, outlined below:

1. Expression of the Hamiltonian – where L is the incremental cost expression

$$H=p_0 L(t,x,u)+ p^T f(t,x,u)$$

2. Maximum Principle* – the control minimizer is a minimizer of the Hamiltonian

$$H\left(u^\ast,x,t\right)\le H(u,x,t)$$

3. Adjoint Equations – time rate of change as it relates to the Hamiltonian

$$\dot{p}=-\nabla_xH(x,u,p,t)$$

4. Transversality Conditions – constraints on the endpoints

$$p\left(t_1\right)-p_o\nabla_xK\left(x\left(t_1\right),t_1\right)=\ \sum_{i=1}^{j}{\alpha_i\nabla_x}g_i(x,u,t)$$

$$-H\left(x\left(t_1\right),u\left(t_1\right),p\left(t_1\right),t_1\right)-p_o\nabla_xK=\sum_{i=1}^{j}{\alpha_i\nabla_t}g_i(x,u,t)$$

* In the case of time varying control constraints, u must be a minimizer of the integral of the Hamiltonian over the duration of the time of flight.

If an optimization problem has some initial and end condition, the transversality conditions are expressed in terms of partials with respect to the terminal state and initial state. 

$$p\left(t_1\right)-p_o\frac{\partial K}{\partial x_1}\left(x\left(t_0\right),x\left(t_1\right),\ t_0,t_1\right)=\ \sum_{i=1}^{j}\alpha_i\frac{\partial g_i}{\partial x_1}(x\left(t_0\right),x\left(t_1\right),\ t_0,t_1)$$

$$p\left(t_0\right)-p_o\frac{\partial K}{\partial x_0}\left(x\left(t_0\right),x\left(t_1\right),\ t_0,t_1\right)=\ \sum_{i=1}^{j}\alpha_i\frac{\partial g_i}{\partial x_0}(x\left(t_0\right),x\left(t_1\right),\ t_0,t_1)$$

In general, the PMP statement of the necessary conditions assumes that the optimal control is a piecewise continuous function. Note that α is a vector of constant values. The following constraints must also apply:

$$p_0\in\left\{0,1\right\}$$

$$\left(p_0,\alpha\right)\neq0$$

Application of the PMP necessary conditions results in a two-point boundary value problem to be solved. 



# Dynamic Programming (Discrete Time)

The central goal of dynamic programming is to determine a control policy, that is, the control u as a function of the state and time which will produce the optimal trajectory. This is achieved through construction of the cost-to-go function, otherwise known as the Bellman Function.

$$V_N=K(x)$$

$$V_k=\min_{u\in U}{L(k,\ x,u)+V_{i+1}(k,x,u)}$$

The Bellman function must be computed backward in time from the terminal cost. The optimal control at a time instance k, is a function of the incremental cost at k, and the Bellman function at k+1.

$$u_k^\ast= \arg\min \ L\left(k,\ x,u\right)+V_{k+1}\left(k,x,u\right)$$

To solve the dynamic programming problem, follow these steps and iterate backwards in time.

1. Start with $V_N$
2. Calculate $Q_{N-1}=L_{N-1}+V_N$
3. Find the optimal control as: $u_{N-1}^\ast=argmin(Q_{N-1})$
4. Use $u_{N-1}^*$ to calculate $V_{N-1}$
5. Repeat

Unfortunately, discrete dynamic programming scales very poorly. The number of operations increases exponentially with the number of states. Typically, DDP strategies are limited to problems with up to 5 states variables. 

## Dynamic Programming (Continuous Time)
In the continuous time case, we can show that the Bellman function must satisfy the following partial differential equation.

$$\min_{u\in U}{L\left(k,\ x,u\right)+\frac{\partial V(t,x)}{\partial t}+\frac{\partial V(t,x)}{\partial x}f(t,x,u)}$$

$$V\left(t_1,x\right)=K(x)$$

This equation is known as the Hamilton-Jacobi-Bellman PDE. The solution can be found by finding the control which minimizes the Bellman PDE, in terms of the partials the Bellman function and x and t. Then plug this expression back into the PDE and solve for the Bellman function. Once the Bellman equation has been found, it can be plugged back into the expression for optimal control to obtain the optimal control. A continuously differential solution to the PDE has met sufficient conditions for optimality. Note that in system of multiple dimensions, the partial of V with respect to each state variable is a vector. 

The gradient of V with respect to all the state variables is in fact the adjoint variable vector used by PMP. In other words, the adjoint variable vector at time t, is exactly the sensitivity of the optimal cost to go changes in the state at the nominal optimal trajectory. This is similar to the idea of the price interpretation of Lagrange multipliers. 

$$p\left(t\right)=\ \left(\frac{\partial V}{\partial x}\right)^T$$

# Sufficient Conditions for Existence of Optimal Control in Continuous Time Problems

If there exists an admissible control, i.e. u(t) exists within a set Ω where Ω is compact, that is a measurable function of time and it results in a state trajectory that satisfies the terminal condition, then there exists an optimal control. Assuming Lipshitz continuity holds for the equations of motion. 

# Singular Arcs & Singular Control

Singular arcs occur when minimization of the Hamiltonian with respect to the control does not provide any useful information about the control. This can occur for instance, if the adjoint variable in front of the control is equal to zero. Singular arcs must be defined over a real time interval and cannot simply occur at a time instance.

Define a function of time, ρ(t), that is the coefficient in front of the control term. As an example, consider the following Hamiltonian. 

$$H=p^T\left(f\left(x\right)+g\left(x\right)\ast u\right)$$

$$\rho\left(t\right)=p^T\left(t\right)\ast g\left(x\left(t\right)\right)$$

Then the optimal control on a singular arc can be found by taking even derivatives of rho with respect to time.  

$$\frac{\partial^{2q}\rho}{\partial t^{2q}}=h_1\left(p,x\right)+h_2\left(p,x\right)u=0$$

$$u^\ast(t)=\ -\frac{h_1(p^\ast(t),\ \ x^\ast(t))}{h_2(p^\ast(t),\ \ x^\ast(t))}$$

Note that in a single input linear time invariant system, if the pair A, b and are controllable*, then singular arcs do not exist.

$$\dot{x}=Ax+Bu$$

### Kelley’s Necessary Conditions for Optimality of Singular Control
Any candidate solution obtained via the previous method must be checked to obey the following condition. Kelley’s conditions must be satisfies to show the existence of singular arcs on an optimal control path.

$$\frac{\partial}{\partial u}\frac{d^k}{dt^k}\rho=0\ \ \ \ for\ k=0,\ \ldots2q-1$$

$$\left(-1\right)^{q+1}\frac{\partial}{\partial u}\frac{d^{2q}}{dt^{2q}}\rho\le0$$

# Neighboring Extremal Optimal Control

Assuming that the optimal control and trajectory have already been computed, this method provides a way to correct the optimal control without having to recompute it from scratch if the initial state is changed. It is a feedback law taking the following form:

$$u\left(t\right)=u^\ast\left(t\right)+\Gamma\left(T\right)\left(x\left(t\right)-x^\ast\left(t\right)\right)$$

Where $\Gamma\left(T\right)$ is a time varying gain $T=t_1-t$. Neighboring extremal optimal control maintains the PMP necessary conditions approximately to the first order.

# Linear Quadratic Optimal Control Problems
This is a special format of optimal control problem where the equations of motion can be represented as a linear time invariant system, and the objective function is represented as a quadratic equation. 

$$\dot{x}=Ax+Bu$$

$$J=\ \frac{1}{2}x^TSx+\frac{1}{2}\int{x^TQx+u^TRu\ dt}$$

These systems can be analyzed in continuous time, discrete time, or through dynamic programming. 

## Continuous Time LQR
Begin by defining the Hamiltonian. It is also possible to show that $$p_0$$ must take the value of one. Then apply PMP. 

$$H=\ \frac{1}{2}p_0\left(x^TQx+u^TRu\ \right)+p^T(Ax+Bu)$$

$$u=\ -R^{-1}B^Tp$$

$$\dot{p}=-Qx-A^Tp$$

$$\dot{x}=Ax-BR^{-1}B^Tp$$

$$p\left(t_1\right)=S_fx(t_1)$$

The adjoint equation and the equations of motion can be re-expressed in matrix form. Then the state transition matrices for linear systems are applied.

$$\left[\begin{matrix}\dot{x}\\\dot{p}\\\end{matrix}\right]=\left[\begin{matrix}A&-BR^{-1}B^T\\-Q&-A\\\end{matrix}\right]\left[\begin{matrix}x\\p\\\end{matrix}\right]=H\left[\begin{matrix}x\\p\\\end{matrix}\right]$$

$$\left[\begin{matrix}\Phi_{11}(t,t_1)&\Phi_{12}(t,t_1)\\\Phi_{21}(t,t_1)&\Phi_{22}(t,t_1)\\\end{matrix}\right]=\exp(H\left(t-t_1\right))$$

We seek a solution to p(t) to the above necessary conditions in the form:

$$p\left(t\right)=P\left(t\right)x\left(t\right)$$

Where P(t) is a time varying n x n matrix to be determined. Using this above format, it is plugged back into the adjoint equation expression to get the following result which must be satisfied by P(t).

$$\dot{P}\left(t\right)+PA-PBR^{-1}B^TP+Q+A^TP=0$$

This is known as the **Ricatti** equation. The following results are obtained

$$P\left(t_1\right)=\ S_f$$

$$P\left(t\right)=\left(\Phi_{21}+\Phi_{22}S_f\right)\left(\Phi_{11}+\Phi_{21}S_f\right)^{-1}$$

$$u^\ast(t)=\ -R^{-1}B^TP\left(t\right)x^\ast(t)$$

Where $$x^\ast(t)$$ is the solution to:

$$\dot{x}\left(t\right)=Ax\left(t\right)-BR^{-1}B^TP\left(t\right)x\left(t\right),\ \ \ \ x\left(t_0\right)=\ x_0$$

Note that the above differential Ricatti equation must be solved backwards in time. A transformation of the P matrix can allow the problem to be solved forward in time.

$$\widetilde{P}\left(\tau\right)=P\left(t_1-\tau\right)$$

$$\widetilde{P}\left(0\right)=S_f$$

$$\frac{\partial\widetilde{P}(\tau)}{\partial\tau}=-\frac{\partial P\left(t_1-\tau\right)}{\partial t}=A^T\widetilde{P}+\widetilde{P}A+\widetilde{P}BR^{-1}B^T\widetilde{P}+Q$$

In the infinite horizon case, if (A, B) is controllable and (A, C) is observable, then in the limit as t1 tends to infinity, P(t) will converge to a symmetric positive definite matrix P that satisfies the Algebraic Riccatti Equation. 

$$PA-PBR^{-1}B^TP+Q+A^TP=0$$

If (A, B) is stabilizable and (A, C) is observable/detectable, where Q = CTC, DARE has a unique positive definite/semi definite solution. 

## Discrete Time LQR
A set of continuous time equations of motion can be converted to a discrete time set of step update equations as follows:

$$\dot{x}=Ax+Bu$$

$$x_{k+1}=A_dx_k+B_du_k$$

$$A_d=e^{A\Delta T}$$

$$B_d=A^{-1}\left(e^{A\Delta T}-I\right)B$$

In the following equations, the discrete time Ad is simply abbreviated as A. Given the initial conditions, x0, it is possible to express the state at any step as a function of the initial conditions and control input at each step (i.e. iterating forward in time through each step)

$$x_k=A^kx_0+\sum_{j=1}^{k-1}{A^{k-1-j}Bu_j}$$

Apply the discrete time necessary conditions to this system. 

$$H_k=\frac{1}{2}x_k^TQx_k+\frac{1}{2}u_k^TRu_k+p_{k+1}^T(Ax_k+Bx_k)$$

The transversality conditions become:

$$p_N=\nabla_{x_N}K=\ S_fx_N$$

Iterate backward in time to find the series of S and F at every time step. 

$$S_N=S_f$$

$$F_{k-1}=-\left(R+B^TS_kB\right)^{-1}B^TS_kA$$

$$S_{k-1}=Q+A^TS_kA+A^TS_kBF_{k-1}$$

$$u_k^\ast=\ F_kx_k$$

Which follows the form of a time varying state feedback control law. The adjoint variables at every step can be found similarly as:

$$p_k^\ast=\ S_kx_k$$

The optimal control and trajectory can then be constructed forward in time beginning with xo and updating according to the optimal control at every point. As an aside, the cost to go comes out in this expression as follows:

$$J^\ast\left(x_k,k\right)=\ \frac{1}{2}x_k^TS_kx_k$$

Note that the derivative of the cost to go is equal to the corresponding adjoint variables at k. This result implies that the adjoint variables are sensitivities of the cost to go with respect to changes in the state. 

## Steady State Discrete LQR
As N tends to infinity, Sk may converge to a matrix S, where S satisfies the “steady state” version of the above equations. 

$$S=Q+A^TSA+A^TSBF$$

$$F=\ -\left(R+B^TSB\right)^{-1}B^TSA$$

The above can be written in as a function of only S, otherwise known as the discrete Riccati Algebraic Equation (DARE).

$$S=Q+A^TSA-A^TSB\left(R+B^TSB\right)^{-1}B^TSA$$

The equivalent form of DARE for the infinite horizon LQR is

$$S=Q+A^TSA-A^TS\left(I+{BR^{-1}B}^TS\right)^{-1}A$$ 

# Continuous Time, Minimum Time, Linear Time-Invariant Optimal Control Problems

Take a time invariant system, with given initial and terminal conditions. The objective is to minimize the transfer time.

$$\dot{x}=Ax+Bu$$

$$x\left(t_0\right)=x_0$$

$$x\left(t_1\right)=0$$

The Hamiltonian is defined, and the adjoint equations are expressed as follows:

$$H=\ p_0+p^T\left(Ax+Bu\right)$$

$$\dot{p}\left(t\right)=\ -\left(\frac{\partial H}{\partial x}\right)^T=-A^Tp(t)$$

$$u_k^\ast=-sign(p^Tb_k)$$

Where $b_k$ is an element in the B matrix. The optimal control assumes only the value of +1 and -1. The time instances at which the control switches from one to the other are called control switch points. Each component of the optimal control has a finite number of switch points. If all the eigenvalues of the matrix A are real-valued then the number of switch points of each component is at most n-1, where n is the dimension of A.