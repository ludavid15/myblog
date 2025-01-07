---
title: "Introduction to Optimization"
topic: "Machine Learning"
path: "optimization"
author: "David Lu"
date: "2021-06-10"
---

The underlying principle of an optimization is pretty straightfoward - find the best way to do something. Best can mean fastest, safest, most efficient, shortest or thousands of other things, but the common denominator is that we are looking for the most (or least) of something. Mathematically then, this is pretty simple: we're solving for a maximum. 

Finding this maximum or minumum is pretty straightforward. However, optimization attempts often fail not because we couldn't find the correct min/max, but because our question was posed poorly in the first place. 

For example, if you wanted to get from point A to point B, the fastest way to do this is probably not the cheapest way. In fact, these things likely trade off with one another. When you frame this mathematically, how do you weigh each objective? Lacking a common unit or denomination, it's like comparing apples to oranges. 

# Mathematics

<v-divider></v-divider>

An optimization problem is generally stated as follows:

$$f\left(x\right)\rightarrow min,\ \ \ \ x\in R^n$$

Subject to equality constraints and inequality constraints

$$g\left(x\right)=0$$

$$h\left(x\right)\le0$$

### NP Completeness
The NP completeness of a problem is a measure of its computational complexity. 

## The Lagrangian
A useful equation in constrained optimization problems. The unconstrained minimizer of the Lagrangian is equal to the constrained minimizer. 

$$\mathcal{L}=q_0f\left(x\right)+p^Tg\left(x\right)+q^Th(x)$$

Lagrange multipliers have a price interpretation, that is, the Lagrange multiplier leading an inequality function is the sensitivity of the final objective cost to slackness in that inequality.

$$h\left(x\right)+b \le 0 $$

$$q=\frac{\partial f^\ast}{\partial b}$$

## Derivatives of Multivariable Functions
Rather than having a singular gradient/slope/derivative, a multivariable function will have a gradient with respect to each variable. This together is represented as a vector of values. 

If we are on a slopped region (in whatever dimension), lines of constant height will always be perpindicular to the local gradient at that point. Thus if we are running something like a steepest descent line search, the direction of steepest descent will be given by the negative of the gradient vector. 

## The Hamiltonian
If the Hamiltonian does not explicitly depend on time, then the Hamiltonian remains constant along the optimal trajectory. Furthermore, if the terminal conditions and cost also do not depend on time, then the Hamiltonian is equal to zero for all time along the trajectory. The vector p contains what are known as adjoint variables.

$$H=\ p_0L(t,x,u)+p^Tf(t,x,u)$$

## Fritz-John Necessary Conditions
The following necessary conditions must hold at any local or global minimizer. The first condition is known as stationarity, the second is dual feasibility, and the third is complementary slackness.

$$\nabla_xL\left(x^\ast,\ p,\ q_0,\ q\right)=0$$

$$q\geq0$$

$$q^Th\left(x^\ast\right)=0$$

In addition to the above, all constraints must be met, the Lagrange multipliers cannot all be zero, and qo is either 0 or 1. In the case where all constraints are linearly independent, we can know that qo takes the value of one. This unique scenario leads to the KKT conditions.

## Karush Khan Tucker Necessary Conditions
Identical to the FJ necessary conditions, with the exception that $q_o$ is taken to be equal to 1. This is most often the case. Note that for KKT to apply, the constraints must be linearly independent of one another (LICQ – Linear Independence of Constraints Qualification). The conditions become:

$$\nabla f\left(x\right)+\sum_{i=1}^{m}{p_i\nabla g_i\left(x\right)}+\sum_{i=1}^{l}{q_i\nabla h_i\left(x\right)}=0$$

$$q\geq0$$

$$q^Th\left(x^\ast\right)=0$$

From a conceptual standpoint, the set of constraints define a feasible region of the design space. If the minimizer exists on one of these boundaries, then the inequality constraint must be equal to zero. Thus, complementary slackness is met. Consider however, there may be other inequality constraints which are not limiting the minimizer. These constraints are not “active” at the minimum, and their Lagrange multipliers must have the value of 0 to satisfy complementary slackness. The set of all nonzero Lagrange multipliers is known as the “active” set. In other words, this is a list of all the inequality constraints which are equal to zero at the minimizer. 

## Hessian

The hessian of a function is the second order derivative. It takes the form of an n x n matrix for a problem with n design variables. Typically abbreviated as just Hf. 

$$\nabla^2f=\left[\begin{matrix}\frac{\partial^2f}{\partial x_{11}^2}&\cdots&\frac{\partial^2f}{\partial x_{1n}^2}\\\vdots&\ddots&\vdots\\\frac{\partial^2f}{\partial x_{n1}^2}&\cdots&\frac{\partial^2f}{\partial x_{nn}^2}\\\end{matrix}\right]$$

# Finite Dimension Optimization Algorithms

<v-divider></v-divider>

### Line Search

Line search algorithms look for the minimum function value for a given search direction. Once a minimum is found, a new search direction is selected, and the line search is repeated. The first direction is typically the steepest descent direction, or the negative of the gradient. 

$$-\nabla f=steepest\ descent$$

It is not always required to find the exact minimum in the search direction. In fact, doing so is often more computationally expensive than it is worth. Instead of requiring the Strong Wolfe conditions, another option is to use sufficient decrease, where if the objective function is found to have decreased enough, it is accepted as the new position.

### Armijo Rule
Conditions for accepting a new point in a line search.

$$f\left(x+ap\right)\le f\left(x\right)+c_1ap^T\nabla f(x)$$

Where a is the step length, p is the search direction, and c_1 is some scaling term that is less than 1. c_1 is usually selected to be very small. 

### Strong Wolfe Condition
In addition to Armijo rule, the strong Wolfe conditions add another requirement on the local curvature. c_2 is usually selected to be much larger than c_1, but still less than 1. 

$$\left|p^T\nabla f(x+ap)\right|\le\ c_2\left|p^T\nabla f(x)\right|$$

### Conjugate Gradient
Conjugate gradient improves line search convergence by providing a better alternative for the search direction than steepest descent. It retains information about the previous descent direction in the direction update for the next search. 

> This is sometimes also known as a momentum term

$$p_k=-\nabla f_k+\beta_kp_{k-1}$$

$$\beta_k=\frac{\nabla f_k^T\nabla f_k}{\nabla f_{k-1}^T\nabla f_k}$$

Where p is the search direction. Conjugate gradient avoids the zig-zagging behavior that can occur when using steepest descent. 

## Newton’s Method

Newton’s method makes a local quadratic approximation of the function and steps to the minimum of that approximation. This requires second order differentiable functions in order to work but has the fastest convergence. The step (i.e. the next point is calculated as x + s) in every iteration is calculated as: 

$$s_k=-H_k^{-1}\nabla f_k$$

Where H is the hessian of the function calculated at that location. For a quadratic function, a minimum is found in a single step. However, because an exact hessian may not be available, the Hessian is typically approximated using the local gradients. This is known as a “Quasi-Newton Method”. BFGS is one such method for approximating the local hessian. It is also possible that the hessian is not positive definite, in which case the search direction is not a descent direction, and it is possible to end at a maximum or saddle point. As with SQP, a line search is frequently performed on top of the search direction once it has been calculated to ensure we are not blindly accepting the update. 

## Trust Regions
This is an alternative to the line search method and helps account for non-positive definite hessian matrices. Effectively, the trust region sets a maximum range on how far a Newton step can take the minimizer point. Then, using this fixed step distance, the search direction is picked which minimizes the function (in contrast to a line search, which fixes the search direction and searches for the step distance). 

### Penalty Methods
Penalty methods provide a way to use unconstrained optimization techniques for constrained optimization problems. While straightforward, penalty methods have poor numerical performance and are generally not used anymore. Sequential quadratic programming is a better way to solve constrained optimization problems. 

# Sequential Quadratic Programming

<v-divider></v-divider>

SQP is the current state of the art method for solving constrained continuously differentiable optimization problems. The general problem that it solves is:

Minimize:	

$$\mathcal{L}=f\left(x,u,t\right)+\lambda h\left(x,u,t\right)+\mu g(x,u,t)$$

Subject to:    	

$$h\left(x,u,t\right)=0$$

$$g\left(x,u,t\right)\le0$$

It is effectively a Newton’s method application to solving the unconstrained Lagrangian equation and can be derived by application of KKT to any generic problem. It makes local quadratic approximations of the design variables and Lagrange multipliers, then repeats. At every step, the system to be solved:

$$\left[\begin{matrix}\nabla_{xx}^2\mathcal{L}&\left[\nabla h\right]^T\\\nabla h&0\\\end{matrix}\right]\bullet\delta X=\left[\begin{matrix}-\nabla_x\mathcal{L}\\-h\\\end{matrix}\right]$$

Where $$\delta X$$ is a stack up of all the design variables and the Lagrange multipliers, and represents the update (i.e. it should be added to the previous set of X values). It is possible and sometimes necessary to perform a line search in this direction to enable better convergence. 

### Gradient Calculation

The method of gradient calculation can have a large impact the accuracy, and hence convergence speed and robustness of the solver. Finite difference is the most straightforward and makes a local linear approximation. Accuracy increases with decreasing step size, up through numerical precision limits, typically on the order of 10e-6. FD also requires at least two function evaluations per term in the gradient. 

$$df\cong\frac{f\left(x+h\right)-f(x)}{h}$$

Complex step eliminates the subtraction step and provides a better approach with more accuracy, and also requires only one function evaluation per term in the gradient. This method is based on the Taylor series expansion, where using a very small value for h allows us to ignore higher order terms. 

$$df\cong \frac{1}{h}Im[f(x+ih)]$$

Algorithmic differentiation, or sometimes known as automatic differentiation is similar to taking an analytical gradient but is performed line by line on the code of the objective function. AD derivates are exact and require zero function evaluations but are limited in regard to where they can be applied. Developers intending to use AD later on should understand ahead of time the types of code that cannot be passed through an AD tool and write their objective function accordingly. For python, the module Autograd provides an easy and useful tool for applying AD to obtain the first order gradient or second order Hessian. 

# Gradient Free Methods

<v-divider></v-divider>

These methods avoid the calculation of a gradient. For this reason, they are more robust to non-continuous objective functions and constraints. Unfortunately, this also means that gradient free methods scale very poorly for problems of very many variables. There are a multitude of different gradient free algorithms, but two of the most popular are the genetic algorithm and Nelder-mead methods. 

Nelder-mead is a simplex method, where a simplex is defined as an N dimensional polyhedron formed form triangles. In 2D, it is a triangle, in 3D it is a tetrahedron, etc. 

# Metaheuristics

<v-divider></v-divider>

Refers generally to a class of optimization methods that are designed to perform “well enough”. These typically can provide good solutions, but in a limited capacity and does not guarantee a perfect solution. 

These strategies make relatively few assumptions about the problem nature and aim to be generally applicable. A common metaheuristic strategy is to implement a form of stochastic optimization. Some examples of metaheuristic optimization include:

1. Ant colony optimization
2. Genetic and evolutionary algorithms
3. Iterated local searches
4. Simulated annealing
5. Tabu search

# References

<v-divider :thickness="5"></v-divider>

*This post is written primarily from notes I took during my graduate classes at the University of Michigan.*

* Martins, Joaquim R. R. A., "Multidisciplinary Design Optimization of Aerospace Systems," Advances and Trends in Optimization with Engineering Applications, SIAM, 2017, pp. 249–257. doi:10.1137/1.9781611974683.ch19
* Martins, Joaquim R. R. A., "Engineering Design Optimization," 2021.
* Kolmanovsky, Ilya. "Flight and Trajectory Optimization". Course taken in Winter 2020.
 

