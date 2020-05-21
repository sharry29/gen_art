from random import randrange, random
split_prob = 0.4

def iteration(genuses):
    mutate_idx = randrange(sum(genuses))
    
    cumsum = 0
    for (genus_idx, genus_size) in enumerate(genuses):
        cumsum += genus_size
        if mutate_idx <= cumsum:
            genuses = mutate(genuses, genus_idx)
            return genuses


def mutate(genuses, genus_idx):
    if random() <= split_prob:
        genuses.insert(genus_idx, 1.0) if random() <= 0.5 else genuses.insert(genus_idx + 1, 1.0)
    else:
        genuses[genus_idx] += 1.0
    return genuses

def run_epoch(n_iterations=150, genuses = [1.0]):
    history = [genuses[:]]
    t = 0
    while t < n_iterations:
        genuses = iteration(genuses)
        history.append(genuses[:])
        t += 1
    return history
        
            

def setup():
    size(800, 800)
    background(20)
    stroke(10)
    global history
    history = run_epoch(genuses=[1.0, 5.0, 1.0, 2.0])
    
    global start_color, end_color, generation_height
    start_color = color(224, 96, 126)
    end_color = color(219, 211, 173)
    
    generation_height = height / float(len(history))
    global max_pop
    max_pop = sum(history[-1])
    
    
def draw():
    for pop_size, generation in enumerate(history):
        x_offset = 0
        gen_size = sum(generation)
        
        gen_width_frac = gen_size / float(max_pop)
        gen_width = gen_width_frac * width
        
        gen_offset = (width / 2.0) - (gen_width / 2)
        
        
        for genus in generation:
            genus_width = genus / gen_size
            fill(lerpColor(start_color, end_color, x_offset))
            rect(gen_offset + gen_width * x_offset, generation_height * pop_size, genus_width * gen_width, generation_height)
            x_offset += genus_width


def keyPressed():
    if key == 'r':
        print('hello')
        len_ = randrange(1, 6)
        genuses = [float(randrange(1, 5)) for _ in range(len_)]
        print(len_)
        global history
        history = run_epoch(genuses=genuses)
        print(len(history))
        
        global max_pop
        max_pop = sum(history[-1])
    if key == 's':
        save(str(start_color) + "--" + str(end_color) + '.png')
        
    
            
        
    
