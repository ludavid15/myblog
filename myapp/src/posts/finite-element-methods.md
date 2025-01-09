---
title: "Finite Element Methods"
topic: "Structures"
path: "finite-element-methods"
author: "David Lu"
date: "2021-06-10"
preview: "Finite element methods, or FEM, is a strategy for modeling complex shapes as a series of small blocks. The math of FEM is foundational for modern computational structural analysis. "
---

Finite element methods, or FEM, is a strategy for modeling complex shapes as a series of small blocks. The math of FEM is foundational for modern computational structural analysis. 

# Spring Model of Elements

<v-divider></v-divider>

All elements are modeled as a spring, that is, exterior force is equal to the stiffness matrix times the displacement at the ends of the spring. 

$$F=Ku$$

# Shape Functions

<v-divider></v-divider>

Shape functions transform the displacements at nodes to the displacement at a point in space. In the equation below, the shape functions are a function of position. 

$$\left[\begin{matrix}\begin{matrix}u\\v\\w\\\end{matrix}\\\end{matrix}\right]=\left[\begin{matrix}\begin{matrix}N_1&0&0\\0&N_2&0\\0&0&N_3\\\end{matrix}&\begin{matrix}\ldots&N_1&0&0\\\ldots&0&N_2&0\\\ldots&0&0&N_3\\\end{matrix}\\\end{matrix}\right]\left[\begin{matrix}u_1\\v_1\\w_1\\\ldots\\u_n\\v_n\\w_n\\\end{matrix}\right]$$

### B Matrix
The “B” Matrix relates the strains to the displacements at the nodes. This depends primarily on the strain equations of the specific case, and so there is not a universal B matrix. 

### Stress

The stress can be found once the nodal displacements, B matrix, and D matrix are known. 

$$\sigma=DBq$$

$$\sigma=D\epsilon$$
 
# Table of Shape Functions

<v-divider></v-divider>

Shape functions transform values at the nodes into values in space. The shape function corresponding to a node should be equal to one if given the coordinate of that node. The sum of all node functions should be also equal to one. From the previous two requirements, we can also understand that at a node, one shape function will evaluate to one, and all others will be zero.


## 1D	

<v-card variant="tonal" class="mb-5">
    <v-card-text>2 Node Shape Function</v-card-text>
</v-card>
	
$$N_1=\frac{x_2-x}{x_2-x_1}\ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ N_2=\frac{x-x_1}{x_2-x_1}$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>3 Node Shape Function</v-card-text>
</v-card>
	
$$N_1=\frac{(x-x_2)(x-x_3)}{(x_1-x_2)(x_1-x_3)}$$

$$N_1=\frac{(x-x_1)(x-x_3)}{(x_2-x_1)(x_2-x_3)}$$

$$N_1=\frac{(x-x_1)(x-x_2)}{(x_3-x_1)(x_3-x_2)}$$

## 2D	

<v-card variant="tonal" class="mb-5">
    <v-card-text>3 Node (Standard Triangle Elements)</v-card-text>
</v-card>
	
$$N_1=\xi\ \ \ \ \ \ N_2=\eta\ \ \ {\ \ \ \ N}_3=1-\xi-\eta$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>4 Node (Standard Quad Elements)</v-card-text>
</v-card>
	
$$N_i=\frac{1}{4}\left(1+{\xi\xi}_i\right)\left(1+\eta\eta_i\right)$$


<v-card variant="tonal" class="mb-5">
    <v-card-text>8 Node (Standard Higher Order Quad Elements)</v-card-text>
</v-card>
	
$$N_{i,corners}=\frac{1}{8}\xi\eta(\xi+\xi_i)(\eta+\eta_i)$$

$$N_{i,\xi=0}=\frac{1}{8}\eta(1-\xi^2)(\eta+\eta_i)$$

$$N_{i,\eta=0}=\frac{1}{8}\xi(1-\eta^2)(\xi+\xi_i)$$

## 3D	

<v-card variant="tonal" class="mb-5">
    <v-card-text>4 Node (Standard Tetrahedral Elements)</v-card-text>
</v-card>
	
$$N_1=\xi\ \ \ \ \ \ {\ \ \ \ \ \ \ N}_2=\eta\ \ \ {\ \ \ \ \ \ \ \ N}_3=\chi\ \ \ \ \ \ \ N_4=1-\xi-\eta-\chi$$

<v-card variant="tonal" class="mb-5">
    <v-card-text>8 Node (Standard Brick Element)</v-card-text>
</v-card>
	
$$N_i=\left(\frac{1}{4}\right)\left(1+{\xi\xi}_i\right)\left(1+\eta\eta_i\right)\left(1+{\chi\chi}_i\right)$$


# Numerical Integration

<v-divider></v-divider>

A definite integral from negative one to one can be approximated numerically by evaluating the function at different points between the range and multiplying by a “weight”. This is represented as:

$$I=\ \int_{-1}^{1}f\left(x\right)dx=w_1f\left(x_1\right)+w_2f\left(x_2\right)+\ldots$$

Depending on the order of the polynomial that is the function f(x) numerical integration can yield exact results. The number of integration points this requires is related to the order of the polynomial by the following expression:

$$n=\ \frac{P+1}{2}$$

Note that the bounds must range from negative one to positive one. It is possible to do this numerical approximation for higher dimensional problems. New integration points are the permutation of integration point values for the 1-dimensional case. 

# Miscellaneous

<v-divider></v-divider>

## Stiffness Matrix

The following matrix can be found using potential energy minimization or calculated directly through analytical means.

$$K=\ \int{B^TDBdV}$$

## Force Vector
There can be multiple things that add terms to the force vector. The final force vector used in the spring expression will be the sum of the following:

$$f_{body}=\ \int{N^TbdV}$$

$$f_{traction}=\ \int{N^TTdA}$$

$$f_{thermal}=\int{B^TD}\epsilon_{thermal}dV$$

Where $\epsilon_{thermal}$ is the thermal strain and is typically equal to $αΔT$. 

## Mass Matrix

The sum of all elements in a mass matrix should be equal to the mass of the element you are modeling. 

$$M=\ \rho\int{N^TNdV}$$

## Natural Frequency

Eigenvalues of the Mass Matrix and Stiffness matrix when the forcing term is set to zero.