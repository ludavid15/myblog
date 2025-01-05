---
title: "Path Planning"
topic: "Dynamics and Controls"
path: "path-planning"
author: "David Lu"
date: "2024-12-10"
---

Across the vast field of robotics and controls, there is a common question of "how do we get from point A to point B?". Without any constraints, the answer is pretty easy - go in a straight line - but this is not very useful. So how can we formulate a more useful question? First, we'll add a safety requirement - that we'd like to make this journey while avoiding obstacles. Then we'll want to make sure we're planning a feasible route - no sharp 180's at supersonic speeds. And finally we'd like to find the best route. Maybe best means shortest, or fastest, or most efficient. With all of these requirements, the task of path planning becomes much more challenging, but most solutions fall into one of four methods. 

# What is a Path?

When we talk about path planning, what information actually makes up a "path"? To figure this out, imagine we are designing an autonomous driver that does everything you do. 

To start, we need (x,y,z) position coordinates. This is akin to choosing which street we take, or which lane on the freeway we use. But we as drivers make more decisions than just position - we also speed up and slow down. So a path might also have velocities (x', y', z') at each position coordinate. To make these velocities happen, we apply accelerations. This quickly gets complicated, so instead of storing three velocities and three accelerations with each position, we could just index each position coordinate by time. This way, we can also calculate any order derivative!

# Sampling Methods

As the name implies, these search the free space for feasible paths. Active methods like Rapidly-Exploring Random Trees (RRT) expand outwards and only add new paths to existing paths (thus keeping everything connected). Meanwhile passive methods like Probabilistic Roadmaps (PRM) fill the feasible space and then must find a connected path. Sampling methods tend to be the most simple, but most do not guarantee a global optimum, nor do they typically consider things like dynamic feasibility, or visibility.

# Node or Heuristic Based Searches

Node based algorithms implement a search to optimize some cost function. In this sense, they represent a form of dynamic programming. Dijkstra's algorithm, A*, and D* are the most well known algorithms of this group. As with sampling methods, the location of the drone and obstacles in the environment must be known ahead of time. Because there is optimization involved, a node based search finds some kind of optimal path, and not just a feasible path. 

# Mathematical Modeling

Mathematical modeling is a more comprehensive, though computationally expensive strategy. With this approach, we write a cost function subject to kinodynamic constraints. This large optimization problem is then solved using a variety of either direct or indirect methods, i.e. through construction of the Hamiltonian, collocation, shooting methods, etc. See the section on [trajectory optimization]({% post_url /algorithms/2021-08-11-trajectoryOptimization %}) for more info.

# Machine Learning Methods

These methods use machine learning to discover an appropriate cost function. Rather than construct a model which tries to capture all the details, we provide data from real human drivers (i.e. throttle and steering wheel inputs). The algorithm then learns how to drive safely by mimicking the data. The final result is more of a controller - learning to track and avoid collisions as they come up - rather than a path planner. 


# Jerk Optimization 

You've probably noticed that sampling methods and node searches don't consider things like dynamic feasibility. They discretize space into grids, and plot a series of waypoints. To convert these waypoints into an actual path, we enforce each waypoint as a constraint, and then minimize the 4th derivative, or the "jerk", of the trajectory. This makes a smooth path, though not necessarily a feasible path. To make it feasible we have to add more constraints, such as a maximum acceleration or velocity. 