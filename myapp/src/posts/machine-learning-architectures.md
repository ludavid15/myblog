---
title: "Machine Learning Architectures"
topic: "Machine Learning"
path: "machine-learning-architectures"
author: "David Lu"
date: "2024-12-10"
---

At its core, machine learning is a **statistical science**, and like statistics, a great deal of care must be taken when formatting and analyzing data. They way we chose to quantify abstract topics and/or measure error will have a significant impact on the quality of our result. 

This post lays a stronger mathematical foundation for machine learning, but if you are just looking for a high level overview of what machine learning is, I recommend reading the machine learning introduction post. For a discussion of machine learning as a wandering exploration of linear algrebra, see the post on linear algebra. In fact, I'd recommend starting on that page first! Matrices are the bedrock of machine learning.


# Part 1 - Basic Architectures

> On the linear algrebra post, we've talked a lot about what we can do with matrices, and we've done this because many problems can be solved without reaching for a neural network that has millions of weights which need to be optimized. Just something to keep in mind! 

## Linear Regression

To start, let's review the most basic type of machine learning problem - linear regression. The aim is to find a linear best-fit relationship between (x) and (y). Note that (x) can be a vector.

$$h(x) = b + \theta_1x_1 + ... + \theta_nx_n = b + \sum_{i=1}^{n}theta_1x_i$$

Where $$h$$ is the model, $b$ is an offset, and the $$\theta$$'s are the weights to be learned. 

Sometimes, the weights are represented by the character $$w$$, which makes sense. 

## K-Means Clustering

Minimizes the intra-cluster variance. The strength of clustering algorithms lies in the fact that it is an unsupervised learning method, i.e., data does not have to come pre-labeled. The process goes:

1. Propose N cluster centers. 
2. Assign every pixel to the closest cluster center. 
3. Calculate new cluster centers using the average of assigned pixels. 
4. Repeat until centers have stabilized.

For data classification, there typically needs to be as many dimensions as independent features (N) we’d like to distinguish. This means that for a task like image classification, we’ll need to find a way to transform a 2D image into a single point in 2D dimensional space. 


## Feed Forward Neural Networks

Networks are function approximators. Each node consists of any number of inputs and any number of outputs, but is itself a simple activation function (relu, sigmoid, tangent, etc.) These functions generally produce an output in the range of 0 to 1 or -1 to 1. For each node, there are a series of weights and offsets to be calculated/tuned by the learning process.


The benefit of deep nets is that they can separate non-linear shapes, at the downside of long computation times and unreliable convergence of results. Also, results depend a lot on how error is measured, the function of each node, etc. 

> Back in the day, pre-training a neural network demonstrated that these could actually be trained efficiently, but since then other strategies have taken over. These include batch normalization and deep residual learning. 


## Mathematical Fundamentals

A neural network (deep or otherwise), can be broken down into this simple equation:

$$y = h(x) = AF(b + Wx)$$

Where $h(x) = y$ is the model to be trained, $b$ is some kind of offset (sometimes ignored), $W$ the set of weights to be calculated, $x$ the set of inputs, and $AF$ is some activation function. If this looks familiar, it's because this is just a slightly modified linear regression! This mathematical basis should also reveal that neural networks are deterministic - the same input will always produce the same output!

But what purpose does the non-linear activation function serve? Well it turns out, without the non-linearity of the activation function, the composition of two linear functions is just yet another linear function. In other words, the activation function is ultimately what allows a NN to accomplish complex tasks. 

### Output Encoding

Depending on the type of task we are training our Neural Network to do, there are different ways to encode our solution. 

### Regression        

Regression usually means we are trying to correlate two values. For this kind of problem, the output can basically be any number, so we use an identity activation function.

### Binary or Boolean Questions

For this kind of task, we'd like a yes/no answer. This usually means a zero or one, so we can use something like a sigmoid or tanh activation function.

### Classification

A classification task has many potential outputs (e.g. apple, pear, strawberry). Here, the output is usually a one-hot encoded vector. This is a sparse vector, where only the index corresponding to a particular class will be set to 1. 

> **Consider:** Why do we use one-hot encoding, and not just assign different numbers to things? For example, if we wanted to classify apples from bannanas from oranges, why can't we use the labels 0, 1, 2?

> **Answer:** Numbers are in sequence, and when we encode three different objects as 0,1,2 we've accidently introduced the concept of order, where in reality there is none (sometimes). 

### Activation Functions

Although the final output node needs a very specific activation function depending on the task, on hidden nodes, the ReLU or tanh function is almost always better than the sigmoid function. 

| Rectified Linear Unit (Relu)
|-
| Unlike the tanh or sigmoid function which approaches a slope of zero at the extremes, ReLU maintains a constant slope, which usually allows machine learning algorithms to converge faster. Sometimes, algorithms use a slightly modified version called "leaky" ReLU, where the slope is slightly positive (rather than zero) for negative values. This is another feature designed to help the optimization converge more quickly. 

| Tanh
|-
| Hyperbolic tangent. Unlike Relu or Sigmoid, this function ranges from -1 to 1. 

| Softmax
|-
| The Softmax functions converts a vector of numbers into a vector of probabilities which sum to one. (Good for a final layer when making predictions)

| Sigmoid
|-
| The sigmoid function ranges from 0 to 1

$$h(x) = \frac{1}{1-e^{-x}}$$


### Overfitting

Overfitting is a common issue of machine learning algorithms, where we increase the accuracy with respect to the training data, at the cost of decreased predictive accuracy. This exists because we expect some random error in the training data. When an algorithm is overfit, it tries to accomodate this random noise, and can lose track of the global trends. 

An overfit model is also said to have high **variance**. A tell-tale sign of high variance is having low error on the training set, but high error on the dev or test set. 


### Receiver Operator Characteristic Curve

The R.O.C plots the probability of correct classification vs the probability of false positive. In an ideal case, the area under the curve will be equal to 1. A random guesser achieves a straight line on this plot, so a classifier needs to beat this result. Placement along the curve is also important, and changes depending on the application.	


### Embeddings

Remember when we defined a one-hot encoding for our multi-classification tasks? One property of this method is that all encodings are equidistant from one another. This may be desireable sometimes, but in certain applications, this is not a good strategy. For example, in language processing, we'd like certain word pairs to be more closely associated than others (i.e. apple/orange vs apple/llama). 

To solve this problem, we can use *embeddings* to represent distinct items. An embedding is a dense vector, where each dimension represents the "something-ness" of that class. For example, maybe the first dimension represents "animal-ness", and the second represents "food-ness". 

In practice, these dimensions are not defined by us, but identified through an algorithm (duh!) and don't always reflect concepts we know. To create embedding vectors for each label, first let's define some variables:


```
O_i     #one-hot vector representing word [i]
E       #embedding matrix of shape (n,m)
```

Where n is the dimension of our embedding vectors, and m is the number of words. Then the embedded representation can be calculated with:

$$e_i = E \cdot O_i$$

Next let's frame the problem statement which will yield the embedding matric E. Given some context, we'd like to predict a target word to fit that context. 

```
Inputs = e_1, e_2, e_3, ... e_7     //context
Outputs = e_t                       //target
```

The input and output can be connected using a basic feed forward network, maybe something like this 

```
layer1 = Dense(100, 70, ReLU)
layer2 = Softmax
```

And finally, we initialize E with random variables, and allow the algorithm to train E along with the network. 

> It turns out, if we're only trying to learn embeddings, we don't need that much "context" - it can be as little as a single random word selected from nearby the target! More context tends to be required if we're also trying to learn a language model (with grammer).


# Part 2 - Deep Learning Architectures

Deep learning algorithms are more powerful, but messier, versions of their linear algebra counterparts. A lot of optimization and more complex architectures are used to learn more abstract behaviors. A few common deep learning architectures are:

1. Feedforward NN's
2. Autoencoders
3. Restricted Boltzman Machine
4. Recurrent Neural Network


## Multi-Layer NN aka Feedforward Neural Network

A Feedforward neural network is also your classic "deep" learning network. It's called deep because there are additional hidden layers between the input and output. In general, adding more layers is not the same as adding more nodes to an existing layer, and the relationship between the two is still being explored today. That being said, adding more layers tends to be more efficient than adding more nodes to existing layers.


### Batch Normalization for Deep NN's

When we train a neural network, we tune each node with the assumption that everywhere else remains static. In truth, the entire set of weights are changed in each step. This can be problematic for training deep networks, because when we tune weights in the early layers, we drastically change the distribution of inputs into the deeper layers. In this sense, we can end up "chasing a moving target" (to quote Jason Brownlee). 

The solution to this is called batch normalization. This simple idea is that we normalize the output of every layer (technically not the output, actually we normalize the input to the activation function). We then give this normalized distribution some trainable weight and bias, before it gets passed through. 

$$\mu = \frac{1}{m} \sum z$$

$$\sigma^2 = \frac{1}{m} \sum (z-\mu)^2$$

$$z_{norm} = \frac{z-\mu}{\sqrt{\sigma^2 + \epsilon}}$$

$$\tilde{z} = \gamma z_{norm} + \beta$$

Where $$\mu$$ and $$\sigma$$ are our normalization parameters, applied to an output *z*. The epsilon is used to stabilize our fraction and avoid dividing by zero when $$\sigma$$ is very small. Finally, $$\gamma$$ and $$\beta$$ are trainable weights. This scaled value, $$\tilde{z}$$ is what gets passed into the activation layer. Notice that if we use $$\beta$$ in this context, we don't actually need *b* later.

$$a = ReLU(w\tilde{z}+b)$$


## Autoencoders

An autoencoders is a form of unsupervised learning. The goal is to compress and decompress information, which forces the algorithm to find key features to "encode" useful patterns. These can be implemented as a deep neural net, but one in which the output has the same dimension as the input. In between, there are a number of hidden layers which first get smaller before growing out in size again.

There are two flavors of autoencoders:
* Regularized autoencoders, or sometimes called sparse autoencoders, are effective for classification tasks. 
* Variational autoencoders use probability distributions instead of discrete variables, and are effective for generating new content. Read more about them [here](/notes/vae)


## Restricted Boltzmann Machine (RBM)

A restricted Boltzmann machine has two layers - a visible layer, and a hidden layer. Every node between the two layers are connected, but none of the nodes within a layer are connected.

The general idea behind a RBM is that there are hidden triggers which result in the data we see. The weights tie each cause (hidden layer) to each effect (visible layer). These result in probabilities, so we just have to tune our weights until the predicted probability of each event matches the probability distribution we see in our training data!

> The words "trigger" and "result-in" are here to illustrate the idea, but in reality no causal relationship is being proven here! A more accurate version would be to say that there are hidden "indicators" which "correlate to" the data we see.  

One advantage to unsupervised learning with an RBM is that results can be obtained with only a few examples. Today, training is performed using an algorithm called **constrastive divergence**, which overcomes some of the scaling issues with RBM's. 


## Recurrent Neural Networks (RNN)

Before we jump into an RNN, consider a simple sentence generation program, which predicts the next word based only on the last word it encountered. Maybe the output looks something like this:

```
> he drinks f("drinks")
> he drinks water f("water")
> he drinks water park f("park")
```

This is clearly limited because each prediction is made without the context of the rest of the sentence ("drinks" and "water" go together, as does "water" and "park", but all three certainly do not make sense together!). Flip this around in terms of a learning algorithm and you can run into the same problem.

A recurrent neural networks is structured such that the output of a hidden layer is used as an additional input back into the same hidden layer. This allows them to learn based on the current AND previous state. But what does the previous state depend on? The state before that. So by recusion, an RNN learns on the entire sequence. Hence's RNN's are useful when data is temporal. 

The output layer of an RNN is usually just the input layer but shifted by one step. Think about it with this example: If the sequence to be predicted by the RNN is ABCD, then for every step of the sequence, a trained RNN would generate:

```
y(A) = AB
y(AB) = ABC
y(ABC) = ABCD
```

See how the input sequence can also act as the labeled output used in a supervised learning algorithm? 

<p class="message">
Long-Short Term Memory is the preferred training algorithm for RNN's. This helps reduce amplification or minimization due to recursion (e.g. 2 * 2 * 2 grows very quickly, while 0.5 * 0.5 * 0.5 shrinks very quickly). LSTM's also solve the issue of long term memory. Even though a basic RNN should "in theory" be able to remember information from long ago, in practice they are unable to. 
</p>

Also note, RNN's can be bi-directional! This is good for natural language processing applications, where a word later in the sentence could be relevant to a word earlier in the sentence. The downside to a bi-directional RNN is that the complete sequence is required before an output can be created. This can be a problem for real-time applications. 


## Long Short Term Memory

For this topic, I recommend reading colah's blog post on [understanding LSTM's](https://colah.github.io/posts/2015-08-Understanding-LSTMs/){:target="_blank"}{:rel="noopener noreferrer"}. He explains it much better than I can, plus he's got pictures to go along with. 

But in summary, within an LSTM there are two additional variables called the hidden state, and the cell state, which are used to carry long term, and short term signals respectively. A series of gates, like a forget gate and an update gate, determine how much these signals are modified at each step.  


## Attention Model

An attention model is basically any model which includes an "attention parameter". This is a learned variable which describes how "important" something is to something else. 

A basic implementation of attention might look like this. 

Where **a** is the activation output from a bi-directional RNN, and **S** is the state output from a forward only RNN. The input to each block **S** will be called the *context*, which is computed as the sum of attention weighted activations.

$$c^{<1>} = \sum_{t=1} \alpha^{<1,t>} a^{<t>}$$

Since alpha is a weighting term, it also makes sense to make sure the vector of alphas will sum to one, like with a softmax function. Now that's all set up, the only remaining question is how to actually compute each attention parameter. Turns out, this can be done by training a small neural network. 

```
Input = S_t_prev, a_t
Output = e_t
model = Dense(2, 1)
```

Keeping in mind that the output `e_t` needs to be passed through a softmax before we actually get alpha. By this point, you can probably tell that this is a lot of computation. The results are maybe better than something we could obtain with a simpler network, but this is a *quadratic* time algorithm (very costly!).

## Convolutional Neural Networks

The principle of a CNN is that a smaller matrix (aka, kernel, feature detector, filter), is passed over (i.e. convolved ) with the raw data. This is repeated over and over, and eventually passed through a fully connected layer (like in regular Neural Networks). 

> In a sense, convolutional networks juxtapose recurrent networks. Where RNN’s are deep, CNNs are shallow.

The key to CNN’s is the kernel matrix. Different kernels can be trained to identify different “features” from the data, ranging from the very basic (e.g. an edge or a corner), to more advanced objects (e.g. an eye or a nose), and finally to the most high level (e.g. a face).

CNN’s are an effective tool for processing very large images, that would take up too much memory using a standard deep neural net. This is accomplished by:

1. Parameter sharing - only a few filters of all the same parameters are used everywhere.
2. Low connectivity - not every pixel depends on every other pixel, only its neighbors.

You can continue reading about convolutional neural networks [here](/notes/cnn)!

## Transformer Network (2017)

A transformer network is a CNN inspired, attention-based approach to natural language processing. In a transformer network, we do away with the recursive component all together, and instead play a game of "word association". 

To begin, let's define a term called **self-attention**. This is an attention based representation of a word. In contrast to embedding vectors which are static, these are context specific. For example, in a sentence containing the words *company*, *phone*, and *technology*, we would guess that the world **apple** is unlikely to refer to a fruit.

We'll make this a function of three parameters, q (query), K (Key), and V (Value). These are computed with a weight matrix and your input word.

$$A(q, K, V) = softmax\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

$$q^{<3>} = W^Q x^{<3>}$$

Next, we would like to take the inner product of every query and key pair. This is akin to asking the question, "how relevant is this word towards the meaning of this other word?" (see how this is a type of *attention*?). These query "answers" are first softmaxed, and then multiplied by each value to compute the total "self attention" of that word. 


The next concept to discuss is **multi-head attention**. Basically, we are recomputing the self-attention parameter for each word, but now with different weight matrices which determine q, K, and V. This is tricky, but the idea is that each "head" is asking a different relational question (e.g. what, when, how, why, etc.). Having multiple "heads" allows for a richer representation of the sentence.

And finally, to put this all together towards an actual translation algorithm, a number of these multi-head attention blocks are set up in an encoder/decoder structure. For more details, you can check out the original paper, called *Attention Is All You Need* by Vaswani (2017).


### Compound Architectures

In recent years, researchers have proposed combined approaches, which make use of more than one architecture. There is for instance, something called an RNN Encoder-Decoder, which attempts to learn the relationship between two different encodings of two different sequences. 

Or to express it another way, the goal is to encode the sequence learned by one RNN into another sequence produced by another RNN. The main application here being translation, where two languages expressing the same idea can have entirely different lengths and grammers.


## Generative Adversarial Modeling

A generative adversarial model, or GAN, is a method to train a generative modeling algorithm. GAN's consist of two parts - a generative model to create plausible examples, and a supervised learning/classifier that tries to distinguish the fake ones from the real ones. They are trained against one another (hence adversarial), until the classifier is no longer able to distinguish between the two. 

