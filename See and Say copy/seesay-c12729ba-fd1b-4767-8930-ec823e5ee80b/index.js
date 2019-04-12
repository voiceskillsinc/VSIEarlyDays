
'use strict';

const Alexa = require('ask-sdk-core');
const cookbook = require('alexa-cookbook.js');
const APP_ID = 'amzn1.ask.skill.64a70a34-2da8-4daf-8163-a1ba7e66d101';

///////////////////////////
const SKILL_NAME = 'See and Say';
const HELP_MESSAGE = 'You can say pull it, spin it, use one of the animals names featured in this Skill a list can be found in the Alexa app, or yes please... Which would you like?';
const HELP_REPROMPT = 'You can say pull it, spin it, use one of the animals names featured in this Skill a list can be found in the Alexa app, or yes please... Which would you like?';
const HELP_PROMPT = 'Examples of what you can say are listed below: ';
const STOP_MESSAGE = 'Thanks for spinning,';
const BREAK = '<break time="1s"/>';
const SMALLIMAGE = 'https://s3.amazonaws.com/seeandsay/cardS.png';
const LARGEIMAGE = 'https://s3.amazonaws.com/seeandsay/cardL.png';
const DisplayImg1 = {
  title: 'Card Logo',
  url: 'https://s3.amazonaws.com/seeandsay/cardL.png'
};
const DisplayImg2 = {
  title: 'Barn Background',
  url: 'https://s3.amazonaws.com/seeandsay/farmbg.png'

};


const goodByes = [
  '<say-as interpret-as="interjection">well done!</say-as>',
  '<say-as interpret-as="interjection">aloha!</say-as>',
  'If you like this educational Skill please leave us a positive review',
  '<say-as interpret-as="interjection">arrivederci!</say-as>',
  'Please be sure to check out our other educational skill Opposite Say',
  '<say-as interpret-as="interjection">au revoir!</say-as>',
  '<say-as interpret-as="interjection">aw man!</say-as>',
  '<say-as interpret-as="interjection">bon voyage!</say-as>',
  'Please be sure to check out our other educational skill Alphabet Say',
  '<say-as interpret-as="interjection">bummer!</say-as>',
  '<say-as interpret-as="interjection">good luck!</say-as>',
  '<say-as interpret-as="interjection">well done!</say-as>',
  'Please be sure to check out our other educational skill Good Table Manners Made Easy',
  '<say-as interpret-as="interjection">oh snap!</say-as>',
  'If you like this educational Skill please leave us a positive review',
  '<say-as interpret-as="interjection">cowabunga!</say-as>'
  ];

const animals = [
    "The dog says" + "<audio src='https://s3.amazonaws.com/seeandsay/dog.mp3' />",
    "The cat says" + "<audio src='https://s3.amazonaws.com/seeandsay/cat.mp3' />",
    "The lion says" + "<audio src='https://s3.amazonaws.com/seeandsay/lion.mp3' />",
    "The frog says" + "<audio src='https://s3.amazonaws.com/seeandsay/frog.mp3' />",
    "The elephants says" + "<audio src='https://s3.amazonaws.com/seeandsay/elephant.mp3' />",
    "The duck says" + "<audio src='https://s3.amazonaws.com/seeandsay/duck.mp3' />",
    "The sheep says" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />",
    "The Hippopotamuses says" + "<audio src='https://s3.amazonaws.com/seeandsay/hippo.mp3' />",
    "The pig says" + "<audio src='https://s3.amazonaws.com/seeandsay/pig.mp3' />",
    "The monkey says" + "<audio src='https://s3.amazonaws.com/seeandsay/monkey.mp3' />",
    "The chicken says" + "<audio src='https://s3.amazonaws.com/seeandsay/chickenClucking.mp3' />",
    "The goat says" + "<audio src='https://s3.amazonaws.com/seeandsay/goat.mp3' />",
    "The bear says" + "<audio src='https://s3.amazonaws.com/seeandsay/bear.mp3' />",
    "The cow says" + "<audio src='https://s3.amazonaws.com/seeandsay/cowmoo.mp3' />",
    "The donkey says" + "<audio src='https://s3.amazonaws.com/seeandsay/donkey.mp3' />",
    "The horse says" + "<audio src='https://s3.amazonaws.com/seeandsay/horse.mp3' />",
    "The fox says" + "<audio src='https://s3.amazonaws.com/seeandsay/fox.mp3' />",
    "The owl says" + "<audio src='https://s3.amazonaws.com/seeandsay/owlhoot.mp3' />",
    "The lamb says" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />",
    "The rooster says" + "<audio src='https://s3.amazonaws.com/seeandsay/roosterSF.mp3' />",
    "The alligator says" + "<audio src='https://s3.amazonaws.com/seeandsay/aligator.mp3' />",
    "The bat says" + "<audio src='https://s3.amazonaws.com/seeandsay/bats.mp3' />",
    "The bumble bee says" + "<audio src='https://s3.amazonaws.com/seeandsay/bee.mp3' />",
    "The bald eagle says" + "<audio src='https://s3.amazonaws.com/seeandsay/baldEagle.mp3' />",
    "The parrot says" + "<audio src='https://s3.amazonaws.com/seeandsay/parrot.mp3' />",
    "The penguin says" + "<audio src='https://s3.amazonaws.com/seeandsay/penguin.mp3' />",
    "The toucan says" + "<audio src='https://s3.amazonaws.com/seeandsay/toucan.mp3' />",
    "The seal says" + "<audio src='https://s3.amazonaws.com/seeandsay/seal.mp3' />",
    "The sea lion says" + "<audio src='https://s3.amazonaws.com/seeandsay/sealion.mp3' />",
    "The whale says" + "<audio src='https://s3.amazonaws.com/seeandsay/whale.mp3' />",
    "The bird says" + "<audio src='https://s3.amazonaws.com/seeandsay/bird.mp3' />",
    "The guinea pig says" + "<audio src='https://s3.amazonaws.com/seeandsay/guineapig.mp3' />",
    "The mouse says" + "<audio src='https://s3.amazonaws.com/seeandsay/mouse.mp3' />",
    "The rabbit says" + "<audio src='https://s3.amazonaws.com/seeandsay/rabbit.mp3' />",
    "The tiger says" + "<audio src='https://s3.amazonaws.com/seeandsay/tiger.mp3' />"
];

const manySound = [
  "<audio src='https://s3.amazonaws.com/seeandsay/pullOne.mp3' />" + "The animals say" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/owlhoot.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/pig.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/hippo.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullTwo.mp3' />" + "The animals say" + "<audio src='https://s3.amazonaws.com/seeandsay/roosterSF.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/fox.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/bear.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/dog.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullThree.mp3' />" + "The animals say" + "<audio src='https://s3.amazonaws.com/seeandsay/chickenClucking.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/donkey.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/horse.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/duck.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullFour.mp3' />" + "The animals say" + "<audio src='https://s3.amazonaws.com/seeandsay/bats.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/sealion.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/whale.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/penguin.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullOne.mp3' />" + "The animals say" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/elephant.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/monkey.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/lion.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullTwo.mp3' />" + "The animals say" + "<audio src='https://s3.amazonaws.com/seeandsay/baldEagle.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/bee.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/seal.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/goat.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullThree.mp3' />" + "The animals say" + "<audio src='https://s3.amazonaws.com/seeandsay/cowmoo.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/donkey.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/horse.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/cat.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullFour.mp3' />" + "The animals say" + "<audio src='https://s3.amazonaws.com/seeandsay/aligator.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/parrot.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/frog.mp3' />" + "<audio src='https://s3.amazonaws.com/seeandsay/toucan.mp3' />"
];

const pulls = [
  "<audio src='https://s3.amazonaws.com/seeandsay/pullOne.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullTwo.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullThree.mp3' />",
  "<audio src='https://s3.amazonaws.com/seeandsay/pullFour.mp3' />"
];

const facts = [
  //Dogs//
  "Dog have superior hearing compared to humans, capable of hearing sounds at four times the distance.",
  "Dogs have a remarkable sense of smell, they are capable of differentiating odors nearly 100 million times lower than humans can.",
  "The average life span for a dog is around 10 to 14 years.",
  "Those involved in dog breeding refer to males as 'dogs', females as 'bitches', dogs younger than a year old as 'puppies' and a group of offspring as a 'litter'.",
  "Domestic dogs are omnivores, they feed on a variety of foods including grains, vegetables and meats.",
  "A large dog’s resting heart beats between 60 and 100 times per minute.",
  "A small dog's resting heart beats between 100 and 140 times per minute.",
  "Dogs have about 1,700 taste buds.",
  "Dogs kick after going to the bathroom, to use the scent glands on their paws to mark their territory.",
  "A Dog’s sense of smell is 10,000 – 100,000 times more acute as that of humans.",
  "45% of dogs sleep in their owner’s bed.",
  "Puppies have 28 teeth and adult dogs have 42.",
  "Adult dogs have 42 teeth.",
  "Puppies can sleep 18 to 20 hours a day during the rapid body growth phase.",
  "The Greyhound, can run up to 44 miles per hour.",
  "There are 400 million dogs in the world.",
  "Dogs can see best at dawn and dusk.",
  "The average number of puppies in a litter ranges from four to six.",
  "Dogs sweat through the pads on their feet.",
  "Petting a dog has shown to lower the human's blood pressure.",
  "The Boy Scouts and Girl Scouts both offer merit badges in dog care.",
  "Female dogs carry puppies for about nine weeks before birth.",
  "Dogs can be taught to count and solve simple math problems.",
  //Cats//
  "Cats are the most, popular pet in the world.",
  "There are over 500 million domestic cats in the world.",
  "Cats and humans have been associated for nearly 10000 years.",
  "Cats conserve energy by sleeping for an average of 13 to 14 hours a day",
  "On average cats live for around 12 to 15 years.",
  "An adult cat has 30 teeth.",
  "The average cat sleeps 13 to 14 hours per day.",
  "A female cat carries her kittens for about 58 to 65 days before they are born.",
  "A cat can jump approximately seven times it's height.",
  "A cat’s sense of smell is approximately 14 times greater than that of a human.",
  "A cat’s whiskers helps them detect objects and navigate in the dark",
  "cats greet one another by touching their noses together.",
  "A group of kittens is called a kindle.",
  "A group of adult cats is called a clowder.",
  "Cats have five toes on each front paw, but only four toes on each back paw.",
  //Lion//
  "Lions are the second largest big cat species in the world, behind tigers.",
  "The average male lion weighs around 180 kg (400 lb) while the average female lion weighs around 130 kg (290 lb)",
  "The heaviest lion on record weighed an amazing 375 kg (826 lbs)",
  "Lions can reach speeds of up to 81 kph (50 mph) but only in short bursts because of a lack of stamina",
  "The roar of a lion can be heard from 8 kilometers (5.0 miles) away",
  "Most lions found in the wild live in southern and eastern parts of Africa",
  "Lions can leap as far as 36 feet.",
  "Lions eat about 20 pounds of meat per day.",
  "Only about 1 in 8 male lions survive to adulthood.",
  "The darker a male lion’s mane, the older he usually is.",
  "A Turkish proverb states: A lion sleeps in the heart of every brave man.",
  "Lions can open their jaws up to 1 foot, larger than a human head.",
  "The African lion’s loose-skin belly allows it to be kicked by prey with little chance of injury.",
  "A lioness and male jaguar hybrid is known as a jaglion.",
  "A lion’s pupil is three times as big as a human’s.",
  "Lions can be several different colors, including tan, brown, yellow, and red.",
  "A lion pride’s territory can be up to 100 square miles.",
  "Lions can sleep up to 22 hours a day.",
  //Frogs//
  "Tadpoles look more like fish than frogs, they have long finned tails and breathe through gills",
  "An amphibian can live both on land and in water",
  "Although frogs live on land their habitat must be near swamps, ponds or in a damp place. This is because they will die if their skin dries out",
  "Instead of drinking water, frogs soak it into their body through their skin",
  "Frogs breathe through their nostrils while also absorbing about half the air they need through their skin",
  //Elephants//
  "The elephant's trunk is able to sense the size, shape and temperature of an object.",
  "An elephant uses its trunk to lift food and suck up water then pour it into its mouth",
  "An elephant's trunk can grow to be about 2 metres long and can weigh up to 140 kg.",
  "Scientists believe that an elephant's trunk is made up of 100,000 muscles, but no bones",
  "Female elephants spend their entire lives living in large groups called herds.",
  "Male elephant leave their herds at about 13 years old and live fairly solitary lives from then on.",
  "Elephants can swim, they use their trunk to breathe like a snorkel in deep water.",
  "Elephants are herbivores and can spend up to 16 hours a day collecting leaves, twigs, bamboo and roots.",
  //Duck//
  "The duck is a number of species in the Anatidae family of birds. They are related to swans and geese",
  "Ducks are mostly aquatic birds living in both fresh water, sea water, and found on every continent except for Antarctica",
  "A male duck is called a drake",
  "A female duck is called a hen",
  "A baby duck is called a duckling",
  "Ducks are omnivores. They feed on aquatic plants, small fish, insects, worms, grubs and more. People often feed domesticated ducks bread",
  "Diving ducks and sea ducks search for food fairly deep underwater. To be able to stay underwater more easily, diving ducks are quite heavy",
  //Sheep//
  "There are over 1 billion sheep in the world",
  "China has the largest number of sheep in the world",
  "Adult female sheep are known as ewes",
  "Adult male sheep are known as rams",
  //Hippo//
  "The name hippopotamus means river horse and is often shortened to hippo",
  "The hippopotamus is generally considered the third largest land mammal (after the White rhinoceros and elephant)",
  "Hippopotamuses spend a large amount of time in water such as rivers, lakes and swamps",
  "Resting in water helps keep a hippopotamuses temperature down",
  "Hippopotamuses give birth in the water",
  //Pigs//
  "Like humans, pigs are omnivores, meaning they eat both plants and other animals.",
  "A pig snout is an important tool for finding food in the ground and sensing the world around them.",
  "Pigs have an excellent sense of smell.",
  "There are around 2 billion pigs in the world.",
  "Humans farm pigs for meat such as pork, bacon and ham.",
  "Pigs have 44 teeth.",
  "Pigs have 4 toes on each hoof, but use only half of them to walk.",
  "Pig is part of the Chinese zodiac, bringing fortune and happiness.",
  "Not all pigs have curly tails.",
  "Piglets respond to their names at about 20 days of age",
  "Mommy Pig's or Sow’s pregnancy lasts 114 days and can give birth to between 7 and 12 piglets, two times per year.",
  "Pigs are quite intelligent and learn tricks faster than dogs.",
  "A litter of piglets is called a farrow.",
  "A piglet weighs about 3 pounds at birth and will double in size a week later.",
  "Pigs have no sweat glands and roll around in the mud to lower their body temperature.",
  "Pigs run at a speed of 11.5 mph or almost 20 km/h.",
  //Monkey//
  "There are currently 264 known monkey species in the world.",
  "Monkeys can be divided into two groups, Old World monkeys that live in Africa and Asia and New World monkeys that live in South America.",
  "A baboon is an example of an Old World monkey, while a marmoset is an example of a New World monkey.",
  "Apes are not monkeys.",
  "Some monkeys live on the ground, while others live in trees.",
  //Chickens//
  "Chickens have a great memory. They can distinguish between over 100 different faces of people or animals.",
  "Chickens have full-color vision.",
  "They actually dream while they sleep.",
  "Chickens can feel pain and distress.",
  "Over 452 million hens are used a year for eggs.",
  "There are over 25 billion Chickens in the world, that's more than any other bird.",
  "Chickens are omnivores. They’ll eat seeds and insects, but also larger prey like small mice and lizards.",
  "The chicken was the first bird to have its genome sequenced, in 2004.",
  "A rooster announces to a flock of chickens that he’s found food with a “took, took, took.” But hens don’t pay attention if they already know where the food is.",
  "Chickens aren’t completely flightless, they can get airborne enough to make it over a fence or into a tree.",
  //Goat Facts//
  "Goats generally live 10 to 12 years. There have been cases of goats living up to 15 years.",
  "Goats were one of the first animals to be tamed by humans and were being herded over 9,000 years ago.",
  "Goats are a member of the cattle family and are believed to be descended from the wild goat, bezoar.",
  "The main products associated with goats are milk, cheese, meat, mohair, and cashmere. Larger dairy goats produce 3,000 to 5,000 pounds of milk each year.",
  "Goats can be taught their name and to come when called.",
  //Bear//
  "Bears live as long as 30 years in the wild. One captive brown bear lived to the age of 47.",
  "Bears can run up to 40 miles per hour, fast enough to catch a running horse. The fastest known human alive today is Usain Bolt, who can run 27mph.",
  "Only the polar bear is a true carnivore, All other bears are omnivores, or animals that eat both plants and meat.",
  "A bear's normal heartbeat is 40 beats per minute.",
  "A hibernating bear's heart rate can drop to 8 bpm.",
  "A polar bear's stomach can hold 150 lbs. (68 kg) of meat.",
  "The symbol of the United Russia Party is a bear.",
  "Bears are traditionally a symbol of pride and power in Russia.",
  "Spectacled bears are the only wild bears that live in South America.",
  "Polar bears have a thick coat with about 9,600 hairs per square inch",
  "The claws on the front feet of bears are longer than the claws on the back feet.",
  "Bears can have claws up to 5 inches long.",
  "The Asiatic black bear has the largest ears of any species of bears.",
  "Around 1,000 giant pandas bears are live in the wild today.",
  "Most bears have 42 teeth",
  "Polar bears are the largest land predators on earth.",
  "Polar bears can stand more than 11' high and weigh more than 1,700 lbs.",
  "Unlike many mammals, bears can see in color.",
  "A polar bear can jump 8 ft. out of the water to surprise it's prey.",
  "Koala bears are not bears at all and are not related to the bear family. They are marsupials.",
  "98% of the grizzly bear population in the U.S., lives in Alaska.",
  //Cow//
  "There is over 1 billion cattle in the world.",
  "Cattle are sacred in India, There are an estimated 300 million cattle in India.",
  "Cattle are red/green color blind.",
  "Cattle are herbivores that eat vegetation such as grass.",
  "Cattle stomachs have four chambers which help break down what they eat.",
  "An average dairy cow weighs about 1,200 pounds.",
  "A cow’s heart beats between 60 and 70 beats per minute.",
  "Cows can hear lower and higher frequencies better than humans.",
  "The average cow drinks 30 to 50 gallons of water each day.",
  "The average cow produces 70 lbs. of milk or 8 gallons per day.",
  "The average cow will eat about 100 lbs. of feed per day.",
  "Cows actually do not bite grass; instead they curl their tongue around it.",
  "Cows have a single stomach, but four different digestive compartments.",
  "Cows are pregnant for 9 months like humans.",
  //Donkey//
  "A boy donkey is called a jack.",
  "A girl donkey is called a jenny",
  "There are wild donkeys in Mexico, Arizona, Nevada, Texas and Mississippi",
  "Donkeys live up to 40 years if given proper care",
  "Like horses, donkeys eat grains and grass",
  "China has more donkeys than any other country in the world",
  //Horse//
  "Horses can sleep both lying down and standing up.",
  "Horses can run shortly after birth.",
  "Domestic horses have a lifespan of around 25 years.",
  "Horses have been domesticated for over 5000 years.",
  "A male horse is called a stallion.",
  "A female horse is called a mare.",
  "A horse is measured in hands. A hand equals 4 inches or the width of a human hand. The tallest horse ever recorded was a Shire called Samson. He stood 7 feet 2 inches tall (21.2 and a half hands).",
  "Horses have 2 blind spots where they can’t see. One is directly behind them and the other is directly in front of them.",
  "A horse’s father is called a sire and the mother of a horse is called a dam.",
  "A pony is not a baby horse. It is a fully grown horse that is small.",
  "When a baby horse is first born it is called a foal.",
  "Mares or mommy horses produce milk for their young and will feed them for several months.",
  "Foals or baby horses can focus their eyes almost as soon as they are born and cut their first teeth within a week.",
  "Horses are fully grown by 4 years of age.",
  "Horses have a good memory. If you’ve been with the same horse for a long time, they will remember you.",
  "Horses shoes need to be removed and their hooves trimmed every 6 weeks.",
  "The person who cares for a horse’s feet is called a farrier or blacksmith.",
  "Horses have small stomachs for their size and need to eat little and often. When in a field, horses will graze for most of the day.",
  "Horses can drink up to ten gallons of water a day.",
  //Fox//
  "Depending on the species, foxes range in size. They usually weigh 13 pounds, like a small to medium sized dog.",
  "Foxes can run fast up to 30 mph, thanks to their slender body.",
  "Foxes share some similarities with cats. They have retractable claws and vertical pupils.",
  "For Foxes pregnancy lasts 53 days and it ends with 3 to 6 pups, They are unable to see, hear or walk in the first couple of days of their life and depend completely on their mother.",
  "Fox can live up to 3 years in the wild and up to 10 years in captivity.",
  //Owl//
  "There are around 200 different owl species.",
  "Owls are active at night (nocturnal).",
  "Owls can turn their heads 270 degrees.",
  "Owls are farsighted, meaning they can't see things close clearly.",
  "Owls are very quiet in flight compared to other birds of prey.",
  //V2//
  //Alligator//
  "Aalligators are cold-blooded.",
  "Alligators can weigh over 450 kg 1000 lb.",
  "American alligators live in south-eastern areas of the United States such as Florida and Louisiana.",
  "Alligators eat a range of different animals such as fish, birds, turtles and even deer.",
  "Alligators have been living on Earth for millions of years and are sometimes described as living fossils.",
  //Bats//
  "Bats are the only mammals capable of continued flight.",
  "There are over 1000 different bat species.",
  "Bats are nocturnal, active at night.",
  "Most bats feed on insects, while others eat fruit, fish or even blood.",
  "Bats can live for over 20 years.",
  //Bees//
  "There are over 250 known species of bumble bees.",
  "A bee's buzz is not produced by the beating of its wings but by vibrating muscles.",
  "Bees have two pairs of wings, the larger fore wings and the smaller hind wings.",
  "Honey is made from the nectar and sweet deposits that bees collect from plants and trees. Honey is stored in honeycomb as a food source for the colony.",
  "There are 9 different families of bees and around 20,000 known species.",
  //Bald Eagle//
  "Bald Eagles are found in North America.",
  "The Great Seal of the United States features a bald eagle.",
  "The bald eagle is the national bird of the United States.",
  "Although their name suggests otherwise, bald eagles are not bald.",
  "Female bald eagles are larger than male bald eagles.",
  //Parrot//
  "There are around 372 different parrot species.",
  "Most parrots live in tropical areas.",
  "Parrots have curved bills or beaks, strong legs and clawed feet.",
  "Parrots are often brightly colored.",
  "Parrots are believed to be one of the most intelligent bird species.",
  //Penguin//
  "Penguins are flightless birds.",
  "While other birds have wings for flying, penguins have adapted flippers to help them swim in the water.",
  "Most penguins live in the Southern Hemisphere.",
  "The Galapagos Penguin is the only penguin specie that ventures north of the equator in the wild.",
  "Large penguin populations can be found in countries such as New Zealand, Australia, Chile, Argentina and South Africa.",
  "No penguins live at the North Pole.",
  "Penguins can drink sea water.",
  //Toucan//
  "Toucan's have long narrow tongues up to 15 cm or 6 in long.",
  "Toucans are one of the nosier jungle birds.",
  "Toucans can live for up to 20 years.",
  "Since the 1960's, Toucan Sam, a cartoon mascot, has been used as the face of Kellogg's breakfast cereal Fruit Loops.",
  "Toucans live together in small-sized flocks, they make nests in tree hollows or holes that have often be created by their distant cousin the woodpecker.",
  "Toucans mainly eat fruit, but sometimes prey on insects and small lizards.",
  //Seal//
  "There are around 33 species of seals.",
  "Seals are believed to have evolved from land based, bear or otter-like ancestors.",
  "Seals are semiaquatic marine mammals. They have four flippers, so they are in a category of animals known as pinnipedia which means fin-footed.",
  "Because they can spend months at sea, seals can sleep underwater.",
  "Some seal species can hold their breath for nearly two hours underwater by slowing their heart beat and conserving oxygen.",
  //Sea lion//
  "The average life span of a sea lion is about 20 years.",
  "Pups or baby sea lions weigh about 13-20 pounds and are 2.5 feet long when they are born.",
  "Sea lions can swim at burst speeds up to 25 miles per hour, but most of the time they swim around 11 miles per hour.",
  "Sea lions have about 38 teeth, which they use to catch their food, They don't use them to chew their food though, they swallow it whole.",
  "Females can weigh between 200 and 400 pounds and can be up to 6.5 feet long.",
  "Male sea lions tend to be larger than females, weighing about 600 to 800 pounds and can be up to 8 feet long.",
  //Whales//
  "To breathe, whales have a blowhole in the top of their heads. When they reach the surface, they take air in through this blowhole.",
  "Whales can swim as fast as 30 miles per hour.",
  "Some Whales can stay underwater for as long as 90 minutes.",
  "The Blue whale is the largest animal in the world.",
  "Some baleen whales sing, Particularly the blue whales and the humpback whales are well known for singing.",
  //V3//
  //Birds//
  "There are around 10000 different species of birds worldwide",
  "Scientists believe that birds evolved from theropod dinosaurs",
  "Birds have hollow bones which help them fly",
  "Some bird species are intelligent enough to create and use tools",
  "The chicken is the most common species of bird found in the world",
  "Hummingbirds can fly backwards",
  "Around 20% of bird species migrate long distances every year",
  "The Bee Hummingbird is the smallest living bird in the world, with a length of just 2 in",
  //Guineapig//
  "Guinea pigs live on average for 4 - 5 years",
  "Grass is the guinea pig's main diet of food, they also need to eat fresh fruit and vegetables",
  "The guinea pig has been a popular household pet in Western societies since they were first bought back by European traders as long ago as the 16th century",
  "Guinea pigs on average weigh 1.5 - 2.5 lbs, and are 8 - 10long",
  "Guinea pigs are not in the pig family or from Guinea",
  "Guinea pigs originated in the Andes mountains of South America. They do not exist naturally in the wild, instead are domesticated descendants of a closely related species the Cavia aperea",
  //Mouse//
  "There are more than 30 known species of mice",
  "Mice tails can grow as long as their bodies",
  "Because they have so many predators mice usually only live for about six months in the wild. In a lab or as a pet they can live for up to two years",
  "The mouse is a delicacy in eastern Zambia and northern Malawi, where they are eaten as a source of protein",
  "Mice use their whiskers to sense changes in temperature and to help feel the surface they are walking along",
  "A mouse eats 15 - 20 times a day",
  "Mice are usually nocturnal animals. They have poor eyesight but make up for this with their very good hearing and smel",
  //Rabbit//
  "More than half of the world’s rabbits live in North America",
  "A female rabbit is called a doe and a male rabbit is called a buck",
  "A young rabbit is called a kit or kitten",
  "Rabbits have a lifespan of around 10 years",
  "Rabbits are born with their eyes closed and without fur",
  "The European rabbit lives underground, in burrows. A group of burrows is known as a warren",
  //Tiger//
   "The tiger is the biggest species of the cat family",
  "Tiger cubs leave their mother when they are around 2 years of age",
  "A group of tigers is known as an ambush or streak",
  "Tigers are good swimmers and can swim up to 6 kilometres",
  "Rare white tigers carry a gene that is only present in around 1 in every 10000 tigers",
  "Tigers have been known to reach speeds up to 40 mph",
  "Tigers can easily jump over 5 metres in length",
  "Around half of tiger cubs don’t live beyond two years of age"
];

const bearFacts = [
  "Bears live as long as 30 years in the wild. One captive brown bear lived to the age of 47.",
  "Bears can run up to 40 miles per hour, fast enough to catch a running horse. The fastest known human alive today is Usain Bolt, who can run 27mph.",
  "Only the polar bear is a true carnivore, All other bears are omnivores, or animals that eat both plants and meat.",
  "A bear's normal heartbeat is 40 beats per minute.",
  "A hibernating bear's heart rate can drop to 8 bpm.",
  "A polar bear's stomach can hold 150 lbs. (68 kg) of meat.",
  "The symbol of the United Russia Party is a bear.",
  "Bears are traditionally a symbol of pride and power in Russia.",
  "Spectacled bears are the only wild bears that live in South America.",
  "Polar bears have a thick coat with about 9,600 hairs per square inch",
  "The claws on the front feet of bears are longer than the claws on the back feet.",
  "Bears can have claws up to 5 inches long.",
  "The Asiatic black bear has the largest ears of any species of bears.",
  "Around 1,000 giant pandas bears are live in the wild today.",
  "Most bears have 42 teeth",
  "Polar bears are the largest land predators on earth.",
  "Polar bears can stand more than 11' high and weigh more than 1,700 lbs.",
  "Unlike many mammals, bears can see in color.",
  "A polar bear can jump 8 ft. out of the water to surprise it's prey.",
  "Koala bears are not bears at all and are not related to the bear family. They are marsupials.",
  "98% of the grizzly bear population in the U.S., lives in Alaska."

];

const catFacts = [
  "Cats are the most, popular pet in the world.",
  "There are over 500 million domestic cats in the world.",
  "Cats and humans have been associated for nearly 10000 years.",
  "Cats conserve energy by sleeping for an average of 13 to 14 hours a day",
  "On average cats live for around 12 to 15 years.",
  "An adult cat has 30 teeth.",
  "The average cat sleeps 13 to 14 hours per day.",
  "A female cat carries her kittens for about 58 to 65 days before they are born.",
  "A cat can jump approximately seven times it's height.",
  "A cat’s sense of smell is approximately 14 times greater than that of a human.",
  "A cat’s whiskers helps them detect objects and navigate in the dark",
  "cats greet one another by touching their noses together.",
  "A group of kittens is called a kindle.",
  "A group of adult cats is called a clowder.",
  "Cats have five toes on each front paw, but only four toes on each back paw."

];

const dogFacts = [
  "Dog have superior hearing compared to humans, capable of hearing sounds at four times the distance.",
  "Dogs have a remarkable sense of smell, they are capable of differentiating odors nearly 100 million times lower than humans can.",
  "The average life span for a dog is around 10 to 14 years.",
  "Those involved in dog breeding refer to males as 'dogs', females as 'bitches', dogs younger than a year old as 'puppies' and a group of offspring as a 'litter'.",
  "Domestic dogs are omnivores, they feed on a variety of foods including grains, vegetables and meats.",
  "A large dog’s resting heart beats between 60 and 100 times per minute.",
  "A small dog's resting heart beats between 100 and 140 times per minute.",
  "Dogs have about 1,700 taste buds.",
  "Dogs kick after going to the bathroom, to use the scent glands on their paws to mark their territory.",
  "A Dog’s sense of smell is 10,000 – 100,000 times more acute as that of humans.",
  "45% of dogs sleep in their owner’s bed.",
  "Puppies have 28 teeth and adult dogs have 42.",
  "Adult dogs have 42 teeth.",
  "Puppies can sleep 18 to 20 hours a day during the rapid body growth phase.",
  "The Greyhound, can run up to 44 miles per hour.",
  "There are 400 million dogs in the world.",
  "Dogs can see best at dawn and dusk.",
  "The average number of puppies in a litter ranges from four to six.",
  "Dogs sweat through the pads on their feet.",
  "Petting a dog has shown to lower the human's blood pressure.",
  "The Boy Scouts and Girl Scouts both offer merit badges in dog care.",
  "Female dogs carry puppies for about nine weeks before birth.",
  "Dogs can be taught to count and solve simple math problems."

];

const donkeyFacts = [
  "A boy donkey is called a jack.",
  "A girl donkey is called a jenny",
  "There are wild donkeys in Mexico, Arizona, Nevada, Texas and Mississippi",
  "Donkeys live up to 40 years if given proper care",
  "Like horses, donkeys eat grains and grass",
  "China has more donkeys than any other country in the world",

];

const duckFacts = [
  "The duck is a number of species in the Anatidae family of birds. They are related to swans and geese",
  "Ducks are mostly aquatic birds living in both fresh water, sea water, and found on every continent except for Antarctica",
  "A male duck is called a drake",
  "A female duck is called a hen",
  "A baby duck is called a duckling",
  "Ducks are omnivores. They feed on aquatic plants, small fish, insects, worms, grubs and more. People often feed domesticated ducks bread",
  "Diving ducks and sea ducks search for food fairly deep underwater. To be able to stay underwater more easily, diving ducks are quite heavy"

];

const cowFacts = [
  "There is over 1 billion cattle in the world.",
  "Cattle are sacred in India, There are an estimated 300 million cattle in India.",
  "Cattle are red/green color blind.",
  "Cattle are herbivores that eat vegetation such as grass.",
  "Cattle stomachs have four chambers which help break down what they eat.",
  "An average dairy cow weighs about 1,200 pounds.",
  "A cow’s heart beats between 60 and 70 beats per minute.",
  "Cows can hear lower and higher frequencies better than humans.",
  "The average cow drinks 30 to 50 gallons of water each day.",
  "The average cow produces 70 lbs. of milk or 8 gallons per day.",
  "The average cow will eat about 100 lbs. of feed per day.",
  "Cows actually do not bite grass; instead they curl their tongue around it.",
  "Cows have a single stomach, but four different digestive compartments.",
  "Cows are pregnant for 9 months like humans."

];

const chickenFacts = [
  "Chickens have a great memory. They can distinguish between over 100 different faces of people or animals.",
  "Chickens have full-color vision.",
  "They actually dream while they sleep.",
  "Chickens can feel pain and distress.",
  "Over 452 million hens are used a year for eggs.",
  "There are over 25 billion Chickens in the world, that's more than any other bird.",
  "Chickens are omnivores. They’ll eat seeds and insects, but also larger prey like small mice and lizards.",
  "The chicken was the first bird to have its genome sequenced, in 2004.",
  "A rooster announces to a flock of chickens that he’s found food with a “took, took, took.” But hens don’t pay attention if they already know where the food is.",
  "Chickens aren’t completely flightless, they can get airborne enough to make it over a fence or into a tree."

];

const goatFacts = [
  "Goats generally live 10 to 12 years. There have been cases of goats living up to 15 years.",
  "Goats were one of the first animals to be tamed by humans and were being herded 9,000 years ago.",
  "They are a member of the cattle family and are believed to be descended from the wild goat, bezoar.",
  "The main products associated with goats are milk, cheese, meat, mohair, and cashmere. Large dairy does produce 3,000 to 5,000 pounds of milk each year.",
  "Goats can be taught their name and to come when called."

];

const elephantFacts = [
  "The elephant's trunk is able to sense the size, shape and temperature of an object.",
  "An elephant uses its trunk to lift food and suck up water then pour it into its mouth",
  "An elephant's trunk can grow to be about 2 metres long and can weigh up to 140 kg.",
  "Scientists believe that an elephant's trunk is made up of 100,000 muscles, but no bones",
  "Female elephants spend their entire lives living in large groups called herds.",
  "Male elephant leave their herds at about 13 years old and live fairly solitary lives from then on.",
  "Elephants can swim, they use their trunk to breathe like a snorkel in deep water.",
  "Elephants are herbivores and can spend up to 16 hours a day collecting leaves, twigs, bamboo and roots."

];

const frogFacts = [
  "Tadpoles look more like fish than frogs, they have long finned tails and breathe through gills",
  "An amphibian can live both on land and in water",
  "Although frogs live on land their habitat must be near swamps, ponds or in a damp place. This is because they will die if their skin dries out",
  "Instead of drinking water, frogs soak it into their body through their skin",
  "Frogs breathe through their nostrils while also absorbing about half the air they need through their skin"

];

const foxFacts = [
  "Depending on the species, foxes range in size. They usually weigh 13 pounds, like a small to medium sized dog.",
  "Foxes can run fast up to 30 mph, thanks to their slender body.",
  "Foxes share some similarities with cats. They have retractable claws and vertical pupils.",
  "For Foxes pregnancy lasts 53 days and it ends with 3 to 6 pups, They are unable to see, hear or walk in the first couple of days of their life and depend completely on their mother.",
  "Fox can live up to 3 years in the wild and up to 10 years in captivity."

];

const owlFacts = [
  "There are around 200 different owl species.",
  "Owls are active at night (nocturnal).",
  "Owls can turn their heads 270 degrees.",
  "Owls are farsighted, meaning they can't see things close clearly.",
  "Owls are very quiet in flight compared to other birds of prey."

];

const horseFacts = [
  "Horses can sleep both lying down and standing up.",
  "Horses can run shortly after birth.",
  "Domestic horses have a lifespan of around 25 years.",
  "Horses have been domesticated for over 5000 years.",
  "A male horse is called a stallion.",
  "A female horse is called a mare.",
  "A horse is measured in hands. A hand equals 4 inches or the width of a human hand. The tallest horse ever recorded was a Shire called Samson. He stood 7 feet 2 inches tall (21.2 and a half hands).",
  "Horses have 2 blind spots where they can’t see. One is directly behind them and the other is directly in front of them.",
  "A horse’s father is called a sire and the mother of a horse is called a dam.",
  "A pony is not a baby horse. It is a fully grown horse that is small.",
  "When a baby horse is first born it is called a foal.",
  "Mares or mommy horses produce milk for their young and will feed them for several months.",
  "Foals or baby horses can focus their eyes almost as soon as they are born and cut their first teeth within a week.",
  "Horses are fully grown by 4 years of age.",
  "Horses have a good memory. If you’ve been with the same horse for a long time, they will remember you.",
  "Horses shoes need to be removed and their hooves trimmed every 6 weeks.",
  "The person who cares for a horse’s feet is called a farrier or blacksmith.",
  "Horses have small stomachs for their size and need to eat little and often. When in a field, horses will graze for most of the day.",
  "Horses can drink up to ten gallons of water a day."

];

const monkeyFacts = [
  "There are currently 264 known monkey species in the world.",
  "Monkeys can be divided into two groups, Old World monkeys that live in Africa and Asia and New World monkeys that live in South America.",
  "A baboon is an example of an Old World monkey, while a marmoset is an example of a New World monkey.",
  "Apes are not monkeys.",
  "Some monkeys live on the ground, while others live in trees."

];

const pigFacts = [
  "Like humans, pigs are omnivores, meaning they eat both plants and other animals.",
  "A pig snout is an important tool for finding food in the ground and sensing the world around them.",
  "Pigs have an excellent sense of smell.",
  "There are around 2 billion pigs in the world.",
  "Humans farm pigs for meat such as pork, bacon and ham.",
  "Pigs have 44 teeth.",
  "Pigs have 4 toes on each hoof, but use only half of them to walk.",
  "Pig is part of the Chinese zodiac, bringing fortune and happiness.",
  "Not all pigs have curly tails.",
  "Piglets respond to their names at about 20 days of age",
  "Mommy Pig's or Sow’s pregnancy lasts 114 days and can give birth to between 7 and 12 piglets, two times per year.",
  "Pigs are quite intelligent and learn tricks faster than dogs.",
  "A litter of piglets is called a farrow.",
  "A piglet weighs about 3 pounds at birth and will double in size a week later.",
  "Pigs have no sweat glands and roll around in the mud to lower their body temperature.",
  "Pigs run at a speed of 11.5 mph or almost 20 km/h."

];

const lionFacts = [
  "Lions are the second largest big cat species in the world, behind tigers.",
  "The average male lion weighs around 180 kg (400 lb) while the average female lion weighs around 130 kg (290 lb)",
  "The heaviest lion on record weighed an amazing 375 kg (826 lbs)",
  "Lions can reach speeds of up to 81 kph (50 mph) but only in short bursts because of a lack of stamina",
  "The roar of a lion can be heard from 8 kilometers (5.0 miles) away",
  "Most lions found in the wild live in southern and eastern parts of Africa",
  "Lions can leap as far as 36 feet.",
  "Lions eat about 20 pounds of meat per day.",
  "Only about 1 in 8 male lions survive to adulthood.",
  "The darker a male lion’s mane, the older he usually is.",
  "A Turkish proverb states: A lion sleeps in the heart of every brave man.",
  "Lions can open their jaws up to 1 foot, larger than a human head.",
  "The African lion’s loose-skin belly allows it to be kicked by prey with little chance of injury.",
  "A lioness and male jaguar hybrid is known as a jaglion.",
  "A lion’s pupil is three times as big as a human’s.",
  "Lions can be several different colors, including tan, brown, yellow, and red.",
  "A lion pride’s territory can be up to 100 square miles.",
  "Lions can sleep up to 22 hours a day."

];

const hippoFacts = [
  "The name hippopotamus means river horse and is often shortened to hippo",
  "The hippopotamus is generally considered the third largest land mammal (after the White rhinoceros and elephant)",
  "Hippopotamuses spend a large amount of time in water such as rivers, lakes and swamps",
  "Resting in water helps keep a hippopotamuses temperature down",
  "Hippopotamuses give birth in the water"

];

const sheepFacts = [
  "There are over 1 billion sheep in the world",
  "China has the largest number of sheep in the world",
  "Adult female sheep are known as ewes",
  "Adult male sheep are known as rams"

];
//V2//
const alligatorFacts = [
  "Aalligators are cold-blooded.",
  "Alligators can weigh over 450 kg 1000 lb.",
  "American alligators live in south-eastern areas of the United States such as Florida and Louisiana.",
  "Alligators eat a range of different animals such as fish, birds, turtles and even deer.",
  "Alligators have been living on Earth for millions of years and are sometimes described as living fossils."
];

const batsFacts = [
  "Bats are the only mammals capable of continued flight.",
  "There are over 1000 different bat species.",
  "Bats are nocturnal, active at night.",
  "Most bats feed on insects, while others eat fruit, fish or even blood.",
  "Bats can live for over 20 years."
];

const beesFacts = [
  "There are over 250 known species of bumble bees.",
  "A bee's buzz is not produced by the beating of its wings but by vibrating muscles.",
  "Bees have two pairs of wings, the larger fore wings and the smaller hind wings.",
  "Honey is made from the nectar and sweet deposits that bees collect from plants and trees. Honey is stored in honeycomb as a food source for the colony.",
  "There are 9 different families of bees and around 20,000 known species."

];

const baldEagleFacts = [
  "Bald Eagles are found in North America.",
  "The Great Seal of the United States features a bald eagle.",
  "The bald eagle is the national bird of the United States.",
  "Although their name suggests otherwise, bald eagles are not bald.",
  "Female bald eagles are larger than male bald eagles."

];

const parrotFacts = [
  "There are around 372 different parrot species.",
  "Most parrots live in tropical areas.",
  "Parrots have curved bills or beaks, strong legs and clawed feet.",
  "Parrots are often brightly colored.",
  "Parrots are believed to be one of the most intelligent bird species."
];

const penguinFacts = [
  "Penguins are flightless birds.",
  "While other birds have wings for flying, penguins have adapted flippers to help them swim in the water.",
  "Most penguins live in the Southern Hemisphere.",
  "The Galapagos Penguin is the only penguin specie that ventures north of the equator in the wild.",
  "Large penguin populations can be found in countries such as New Zealand, Australia, Chile, Argentina and South Africa.",
  "No penguins live at the North Pole.",
  "Penguins can drink sea water."
];

const toucanFacts = [
  "Toucan's have long narrow tongues up to 15 cm or 6 in long.",
  "Toucans are one of the nosier jungle birds.",
  "Toucans can live for up to 20 years.",
  "Since the 1960's, Toucan Sam, a cartoon mascot, has been used as the face of Kellogg's breakfast cereal Fruit Loops.",
  "Toucans live together in small-sized flocks, they make nests in tree hollows or holes that have often be created by their distant cousin the woodpecker.",
  "Toucans mainly eat fruit, but sometimes prey on insects and small lizards."
];

const sealFacts = [
  "There are around 33 species of seals.",
  "Seals are believed to have evolved from land based, bear or otter-like ancestors.",
  "Seals are semiaquatic marine mammals. They have four flippers, so they are in a category of animals known as pinnipedia which means fin-footed.",
  "Because they can spend months at sea, seals can sleep underwater.",
  "Some seal species can hold their breath for nearly two hours underwater by slowing their heart beat and conserving oxygen."
];

const seaLionFacts = [
  "The average life span of a sea lion is about 20 years.",
  "Pups or baby sea lions weigh about 13-20 pounds and are 2.5 feet long when they are born.",
  "Sea lions can swim at burst speeds up to 25 miles per hour, but most of the time they swim around 11 miles per hour.",
  "Sea lions have about 38 teeth, which they use to catch their food, They don't use them to chew their food though, they swallow it whole.",
  "Females can weigh between 200 and 400 pounds and can be up to 6.5 feet long.",
  "Male sea lions tend to be larger than females, weighing about 600 to 800 pounds and can be up to 8 feet long."
];

const whaleFacts = [
  "To breathe, whales have a blowhole in the top of their heads. When they reach the surface, they take air in through this blowhole.",
  "Whales can swim as fast as 30 miles per hour.",
  "Some Whales can stay underwater for as long as 90 minutes.",
  "The Blue whale is the largest animal in the world.",
  "Some baleen whales sing, Particularly the blue whales and the humpback whales are well known for singing."
];

const birdFacts = [
  "There are around 10000 different species of birds worldwide",
  "Scientists believe that birds evolved from theropod dinosaurs",
  "Birds have hollow bones which help them fly",
  "Some bird species are intelligent enough to create and use tools",
  "The chicken is the most common species of bird found in the world",
  "Hummingbirds can fly backwards",
  "Around 20% of bird species migrate long distances every year",
  "The Bee Hummingbird is the smallest living bird in the world, with a length of just 2 in"
  ];

const guineaPigFacts = [
  "Guinea pigs live on average for 4 - 5 years",
  "Grass is the guinea pig's main diet of food, they also need to eat fresh fruit and vegetables",
  "The guinea pig has been a popular household pet in Western societies since they were first bought back by European traders as long ago as the 16th century",
  "Guinea pigs on average weigh 1.5 - 2.5 lbs, and are 8 - 10long",
  "Guinea pigs are not in the pig family or from Guinea",
  "Guinea pigs originated in the Andes mountains of South America. They do not exist naturally in the wild, instead are domesticated descendants of a closely related species the Cavia aperea"
  ];

const mouseFacts = [
  "There are more than 30 known species of mice",
  "Mice tails can grow as long as their bodies",
  "Because they have so many predators mice usually only live for about six months in the wild. In a lab or as a pet they can live for up to two years",
  "The mouse is a delicacy in eastern Zambia and northern Malawi, where they are eaten as a source of protein",
  "Mice use their whiskers to sense changes in temperature and to help feel the surface they are walking along",
  "A mouse eats 15 - 20 times a day",
  "Mice are usually nocturnal animals. They have poor eyesight but make up for this with their very good hearing and smel"
  ];

const rabbitFacts = [
  "More than half of the world’s rabbits live in North America",
  "A female rabbit is called a doe and a male rabbit is called a buck",
  "A young rabbit is called a kit or kitten",
  "Rabbits have a lifespan of around 10 years",
  "Rabbits are born with their eyes closed and without fur",
  "The European rabbit lives underground, in burrows. A group of burrows is known as a warren"
  ];

const tigerFacts = [
  "The tiger is the biggest species of the cat family",
  "Tiger cubs leave their mother when they are around 2 years of age",
  "A group of tigers is known as an ambush or streak",
  "Tigers are good swimmers and can swim up to 6 kilometres",
  "Rare white tigers carry a gene that is only present in around 1 in every 10000 tigers",
  "Tigers have been known to reach speeds up to 40 mph",
  "Tigers can easily jump over 5 metres in length",
  "Around half of tiger cubs don’t live beyond two years of age"
  ];

const nameAnimal = [
  "alligator",
  "bald eagle",
  "bat",
  "bear",
  "bubble bee",
  "bird",
  "cat",
  "chicken",
  "cow",
  "dog",
  "donkey",
  "duck",
  "elephant",
  "fox",
  "frog",
  "goat",
  "guinea pig",
  "hippopotamuss",
  "horse",
  "lamb",
  "lion",
  "monkey",
  "mouse",
  "parrot",
  "penguin",
  "pigs",
  "rabbit",
  "rooster",
  "sea lion",
  "seal",
  "sheep",
  "tiger",
  "toucan",
  "whale"
  ];

const alligators = cookbook.getRandomItem(alligatorFacts);
const baldeagles = cookbook.getRandomItem(baldEagleFacts);
const bats = cookbook.getRandomItem(batsFacts);
const bears = cookbook.getRandomItem(bearFacts);
const bubblebees = cookbook.getRandomItem(beesFacts);
const birds = cookbook.getRandomItem(birdFacts);
const cats = cookbook.getRandomItem(catFacts);
const chickens = cookbook.getRandomItem(chickenFacts);
const cows = cookbook.getRandomItem(cowFacts);
const dogs = cookbook.getRandomItem(dogFacts);
const donkeys = cookbook.getRandomItem(donkeyFacts);
const ducks = cookbook.getRandomItem(duckFacts);
const elephants = cookbook.getRandomItem(elephantFacts);
const foxs = cookbook.getRandomItem(foxFacts);
const frogs = cookbook.getRandomItem(frogFacts);
const goats = cookbook.getRandomItem(goatFacts);
const guineapigs = cookbook.getRandomItem(guineaPigFacts);
const hippopotamuss = cookbook.getRandomItem(hippoFacts);
const horses = cookbook.getRandomItem(horseFacts);
const lambs = cookbook.getRandomItem(sheepFacts);
const lions = cookbook.getRandomItem(lionFacts);
const monkeys = cookbook.getRandomItem(monkeyFacts);
const owls = cookbook.getRandomItem(owlFacts);
const mouses = cookbook.getRandomItem(mouseFacts);
const parrots = cookbook.getRandomItem(parrotFacts);
const penguins = cookbook.getRandomItem(penguinFacts);
const pigs = cookbook.getRandomItem(pigFacts);
const rabbits = cookbook.getRandomItem(rabbitFacts);
const roosters = cookbook.getRandomItem(chickenFacts);
const sealions = cookbook.getRandomItem(seaLionFacts);
const seals = cookbook.getRandomItem(sealFacts);
const sheeps = cookbook.getRandomItem(sheepFacts);
const tigers = cookbook.getRandomItem(tigerFacts);
const toucans = cookbook.getRandomItem(toucanFacts);
const whales = cookbook.getRandomItem(whaleFacts);

const dataVoice = {
  "sounds" : [
  {
    AnimalName: 'Alligator',
    AnimalSound: "The alligator says" + "<audio src='https://s3.amazonaws.com/seeandsay/aligator.mp3' />",
    AnimalFact:  alligators,
    SmallImage: "https://s3.amazonaws.com/seeandsay/alligators.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/alligatorsb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Bald Eagle',
    AnimalSound: "The bald eagle says" + "<audio src='https://s3.amazonaws.com/seeandsay/baldEagle.mp3' />",
    AnimalFact: baldeagles,
    SmallImage: "https://s3.amazonaws.com/seeandsay/baldEagles.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/baldEaglel.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Bat',
    AnimalSound: "The bat says" + "<audio src='https://s3.amazonaws.com/seeandsay/bats.mp3",
    AnimalFact: bats,
    SmallImage: "https://s3.amazonaws.com/seeandsay/bats.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/batl.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Bear',
    AnimalSound: "The bear says" + "<audio src='https://s3.amazonaws.com/seeandsay/bear.mp3' />",
    AnimalFact: bears,
    SmallImage: "https://s3.amazonaws.com/seeandsay/bear.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/bearb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Bubble Bee',
    AnimalSound: "The bubble bee says" + "<audio src='https://s3.amazonaws.com/seeandsay/bee.mp3' />",
    AnimalFact: bubblebees,
    SmallImage: "https://s3.amazonaws.com/seeandsay/bees.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/beel.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Bird',
    AnimalSound: "The bird says" + "<audio src='https://s3.amazonaws.com/seeandsay/bird.mp3' />",
    AnimalFact: birds,
    SmallImage: "https://s3.amazonaws.com/seeandsay/birds.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/birdb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Cat',
    AnimalSound: "The cat says" + "<audio src='https://s3.amazonaws.com/seeandsay/cat.mp3' />",
    AnimalFact: cats,
    SmallImage: "https://s3.amazonaws.com/seeandsay/cats.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/catb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Cow',
    AnimalSound: "The cow says" + "<audio src='https://s3.amazonaws.com/seeandsay/cowmoo.mp3' />",
    AnimalFact: cows,
    SmallImage: "https://s3.amazonaws.com/seeandsay/cows.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/cowb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Chicken',
    AnimalSound: "The chicken says" + "<audio src='https://s3.amazonaws.com/seeandsay/roosterSF.mp3",
    AnimalFact: chickens,
    SmallImage: "https://s3.amazonaws.com/seeandsay/chicken.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/chickenb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Dog',
    AnimalSound: "The dog says" + "<audio src='https://s3.amazonaws.com/seeandsay/dog.mp3' />",
    AnimalFact: dogs,
    SmallImage: "https://s3.amazonaws.com/seeandsay/dog.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/dogb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Donkey',
    AnimalSound: "The donkey says" + "<audio src='https://s3.amazonaws.com/seeandsay/donkey.mp3' />",
    AnimalFact: donkeys,
    SmallImage: "https://s3.amazonaws.com/seeandsay/donkey.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/donkeyb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Duck',
    AnimalSound: "The duck says" + "<audio src='https://s3.amazonaws.com/seeandsay/duck.mp3' />",
    AnimalFact: ducks,
    SmallImage: "https://s3.amazonaws.com/seeandsay/duck.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/duckb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Elephant',
    AnimalSound: "The elephant says" + "<audio src='https://s3.amazonaws.com/seeandsay/elephant.mp3' />",
    AnimalFact: elephants,
    SmallImage: "https://s3.amazonaws.com/seeandsay/elephant.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/elephantb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Fox',
    AnimalSound: "The fox says" + "<audio src='https://s3.amazonaws.com/seeandsay/fox.mp3' />",
    AnimalFact: foxs,
    SmallImage: "https://s3.amazonaws.com/seeandsay/alligators.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/alligatorsb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Frog',
    AnimalSound: "The frog says" + "<audio src='https://s3.amazonaws.com/seeandsay/frog.mp3' />",
    AnimalFact: frogs,
    SmallImage: "https://s3.amazonaws.com/seeandsay/frogs.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/frogb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Goat',
    AnimalSound: "The goat says" + "<audio src='https://s3.amazonaws.com/seeandsay/goat.mp3' />",
    AnimalFact: goats,
    SmallImage: "https://s3.amazonaws.com/seeandsay/goats.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/goat.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Guinea Pig',
    AnimalSound: "The guinea pig says" + "<audio src='https://s3.amazonaws.com/seeandsay/guineapig.mp3' />",
    AnimalFact: guineapigs,
    SmallImage: "https://s3.amazonaws.com/seeandsay/guineaps.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/guineapb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Hippopotamus',
    AnimalSound: "The hippopotamus says" + "<audio src='https://s3.amazonaws.com/seeandsay/hippo.mp3' />",
    AnimalFact: hippopotamuss,
    SmallImage: "https://s3.amazonaws.com/seeandsay/hippo.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/hippob.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Horse',
    AnimalSound: "The horse says" + "<audio src='https://s3.amazonaws.com/seeandsay/horse.mp3' />",
    AnimalFact: horses,
    SmallImage: "https://s3.amazonaws.com/seeandsay/horses.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/horseb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Lamb',
    AnimalSound: "The lamb says" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />",
    AnimalFact: lambs,
    SmallImage: "https://s3.amazonaws.com/seeandsay/sheep.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/sheepb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Lion',
    AnimalSound: "The lion says" + "<audio src='https://s3.amazonaws.com/seeandsay/lion.mp3' />",
    AnimalFact: lions,
    SmallImage: "https://s3.amazonaws.com/seeandsay/lion.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/lionbsb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Monkey',
    AnimalSound: "The monkey says" + "<audio src='https://s3.amazonaws.com/seeandsay/monkey.mp3' />",
    AnimalFact: monkeys,
    SmallImage: "https://s3.amazonaws.com/seeandsay/monkey.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/monkeyb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Owl',
    AnimalSound: "The owl says" + "<audio src='https://s3.amazonaws.com/seeandsay/owlhoot.mp3' />",
    AnimalFact: owls,
    SmallImage: "https://s3.amazonaws.com/seeandsay/owl.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/owlb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Mouse',
    AnimalSound: "The mouse says" + "<audio src='https://s3.amazonaws.com/seeandsay/mouse.mp3' />",
    AnimalFact: mouses,
    SmallImage: "https://s3.amazonaws.com/seeandsay/mouses.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/mouseb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Parrot',
    AnimalSound: "The parrot says" + "<audio src='https://s3.amazonaws.com/seeandsay/parrot.mp3' />",
    AnimalFact: parrots,
    SmallImage: "https://s3.amazonaws.com/seeandsay/parrots.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/parrotl.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Penguin',
    AnimalSound: "The penguin says" + "<audio src='https://s3.amazonaws.com/seeandsay/penguin.mp3' />",
    AnimalFact: penguins,
    SmallImage: "https://s3.amazonaws.com/seeandsay/penguins.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/penguinl.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Pig',
    AnimalSound: "The pig says" + "<audio src='https://s3.amazonaws.com/seeandsay/pig.mp3' />",
    AnimalFact: pigs,
    SmallImage: "https://s3.amazonaws.com/seeandsay/pig.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/pigb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Rabbit',
    AnimalSound: "The rabbit says" + "<audio src='https://s3.amazonaws.com/seeandsay/rabbit.mp3' />",
    AnimalFact: rabbits,
    SmallImage: "https://s3.amazonaws.com/seeandsay/rabbits.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/rabbitb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Rooster',
    AnimalSound: "The rooster says" + "<audio src='https://s3.amazonaws.com/seeandsay/roosterSF.mp3' />",
    AnimalFact: roosters,
    SmallImage: "https://s3.amazonaws.com/seeandsay/rooster.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/roosterb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Sea Lion',
    AnimalSound: "The sea lion says" + "<audio src='https://s3.amazonaws.com/seeandsay/sealion.mp3' />",
    AnimalFact: sealions,
    SmallImage: "https://s3.amazonaws.com/seeandsay/seaLions.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/seaLionb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Seal',
    AnimalSound: "The seal says" + "<audio src='https://s3.amazonaws.com/seeandsay/seal.mp3' />",
    AnimalFact: seals,
    SmallImage: "https://s3.amazonaws.com/seeandsay/seals.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/sealb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Sheep',
    AnimalSound: "The sheep says" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />",
    AnimalFact: sheeps,
    SmallImage: "https://s3.amazonaws.com/seeandsay/sheep.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/sheepb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Tiger',
    AnimalSound: "The tiger says" + "<audio src='https://s3.amazonaws.com/seeandsay/tiger.mp3' />",
    AnimalFact: tigers,
    SmallImage: "https://s3.amazonaws.com/seeandsay/tigers.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/tigerb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Toucan',
    AnimalSound: "The toucan says" + "<audio src='https://s3.amazonaws.com/seeandsay/toucan.mp3' />",
    AnimalFact: toucans,
    SmallImage: "https://s3.amazonaws.com/seeandsay/toucans.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/toucanb.png",
    Category: 'See Say',
  },
  {
    AnimalName: 'Whale',
    AnimalSound: "The whale says" + "<audio src='https://s3.amazonaws.com/seeandsay/whale.mp3' />",
    AnimalFact: whales,
    SmallImage: "https://s3.amazonaws.com/seeandsay/whales.png",
    LargeImage: "https://s3.amazonaws.com/seeandsay/whalel.png",
    Category: 'See Say',
  },
  ],
};

////////////////////////////////////////////
const defaultItemTokentwo = '1';
const animalsfact = cookbook.getRandomItem(facts);
const imagePathTwo = 'https://s3.amazonaws.com/seeandsay/{A}.png';
const dataTwo = [
  {
    AnimalName: 'Random Animal Fact',
    AnimalHint: 'Touch for a random animal fact!',
    AnimalSound: animalsfact + "Would you like to try again?",
    AnimalPic: 'cardSS',
    abbreviation: '1',
    token: '1',
  },
  {
    AnimalName: 'Alligator',
    AnimalHint: 'Touch or say give me an Alligator fact.',
    AnimalSound: 'The alligator says' + "<audio src='https://s3.amazonaws.com/seeandsay/aligator.mp3' />" + "Would you like to try again?",
    AnimalPic: 'alligatorss',
    abbreviation: 'alligator',
    token: 'alligator',
  },
  {
    AnimalName: 'Bald Eagle',
    AnimalHint: 'Touch or say give me a Bald Eagle fact.',
    AnimalSound: "The bald eagle says" + "<audio src='https://s3.amazonaws.com/seeandsay/baldEagle.mp3' />" + "Would you like to try again?",
    AnimalPic: 'baldEagless',
    abbreviation: '3',
    token: '3',
  },
  {
    AnimalName: 'Bat',
    AnimalHint: 'Touch or say give me a Bald Eagle fact.',
    AnimalSound: "The bat says" + "<audio src='https://s3.amazonaws.com/seeandsay/bats.mp3" + "Would you like to try again?",
    AnimalPic: 'batss',
    abbreviation: 'bat',
    token: 'bat',
  },
  {
    AnimalName: 'Bear',
    AnimalHint: 'Touch or say give me a Bear fact.',
    AnimalSound: "The bear says" + "<audio src='https://s3.amazonaws.com/seeandsay/bear.mp3' />" + "Would you like to try again?",
    AnimalPic: 'bears',
    abbreviation: '5',
    token: '5',
  },
  {
    AnimalName: 'Bubble Bee',
    AnimalHint: 'Touch or say give me a Bumble Bee fact.',
    AnimalSound: "The bee says" + "<audio src='https://s3.amazonaws.com/seeandsay/bee.mp3' />" + "Would you like to try again?",
    AnimalPic: 'beess',
    abbreviation: '6',
    token: '6',
  },
  {
    AnimalName: 'Bird',
    AnimalHint: 'Touch or say give me a bird fact.',
    AnimalSound: "The bird says" + "<audio src='https://s3.amazonaws.com/seeandsay/bird.mp3' />" + "Would you like to try again?",
    AnimalPic: 'birdss',
    abbreviation: '7',
    token: '7',
  },
  {
    AnimalName: 'Cat',
    AnimalHint: 'Touch or say give me a cat fact.',
    AnimalSound: "The cat says" + "<audio src='https://s3.amazonaws.com/seeandsay/cat.mp3' />" + "Would you like to try again?",
    AnimalPic: 'cats',
    abbreviation: '8',
    token: '8',
  },
  {
    AnimalName: 'Chicken',
    AnimalHint: 'Touch or say give me a chicken fact.',
    AnimalSound: "The chicken says" + "<audio src='https://s3.amazonaws.com/seeandsay/roosterSF.mp3' />" + "Would you like to try again?",
    AnimalPic: 'chicken',
    abbreviation: '9',
    token: '9',
  },
  {
    AnimalName: 'Cow',
    AnimalHint: 'Touch or say give me a cow fact.',
    AnimalSound: "The cow says" + "<audio src='https://s3.amazonaws.com/seeandsay/cowmoo.mp3' />" + "Would you like to try again?",
    AnimalPic: 'cows',
    abbreviation: 'ten',
    token: '10',
  },
  {
    AnimalName: 'Dog',
    AnimalHint: 'Touch or say give me a dog fact.',
    AnimalSound: "The dog says" + "<audio src='https://s3.amazonaws.com/seeandsay/dog.mp3' />" + "Would you like to try again?",
    AnimalPic: 'dogs',
    abbreviation: '11',
    token: '11',
  },
  {
    AnimalName: 'Donkey',
    AnimalHint: 'Touch or say give me a donkey fact.',
    AnimalSound: "The donkey says" + "<audio src='https://s3.amazonaws.com/seeandsay/donkey.mp3' />" + "Would you like to try again?",
    AnimalPic: 'donkeys',
    abbreviation: '12',
    token: '12',
  },
  {
    AnimalName: 'Duck',
    AnimalHint: 'Touch or say give me a duck fact.',
    AnimalSound: "The duck says" + "<audio src='https://s3.amazonaws.com/seeandsay/duck.mp3' />" + "Would you like to try again?",
    AnimalPic: 'ducks',
    abbreviation: '13',
    token: '13',
  },
  {
    AnimalName: 'Elephant',
    AnimalHint: 'Touch or say give me an elephant fact.',
    AnimalSound: "The elephant says" + "<audio src='https://s3.amazonaws.com/seeandsay/elephant.mp3' />" + "Would you like to try again?",
    AnimalPic: 'elephants',
    abbreviation: '14',
    token: '14',
  },
  {
    AnimalName: 'Fox',
    AnimalHint: 'Touch or say give me a fox fact.',
    AnimalSound: "The fox says" + "<audio src='https://s3.amazonaws.com/seeandsay/fox.mp3' />" + "Would you like to try again?",
    AnimalPic: 'foxs',
    abbreviation: '15',
    token: '15',
  },
  {
    AnimalName: 'Frog',
    AnimalHint: 'Touch or say give me a frog fact.',
    AnimalSound: "The frog says" + "<audio src='https://s3.amazonaws.com/seeandsay/frog.mp3' />" + "Would you like to try again?",
    AnimalPic: 'frogs',
    abbreviation: '16',
    token: '16',
  },
  {
    AnimalName: 'Goat',
    AnimalHint: 'Touch or say give me a goat fact.',
    AnimalSound: "The goat says" + "<audio src='https://s3.amazonaws.com/seeandsay/goat.mp3' />" + "Would you like to try again?",
    AnimalPic: 'goats',
    abbreviation: '17',
    token: '17',
  },
  {
    AnimalName: 'Guinea Pig',
    AnimalHint: 'Touch or say give me a Guinea Pig fact.',
    AnimalSound: "The guinea pig says" + "<audio src='https://s3.amazonaws.com/seeandsay/guineapig.mp3' />" + "Would you like to try again?",
    AnimalPic: 'guineapss',
    abbreviation: '18',
    token: '18',
  },
  {
    AnimalName: 'Hippopotamus',
    AnimalHint: 'Touch or say give me a hippopotamus fact.',
    AnimalSound: "The hippopotamus says" + "<audio src='https://s3.amazonaws.com/seeandsay/hippo.mp3' />" + "Would you like to try again?",
    AnimalPic: 'hippos',
    abbreviation: '19',
    token: '19',
  },
  {
    AnimalName: 'Horse',
    AnimalHint: 'Touch or say give me a horse fact.',
    AnimalSound: "The horse says" + "<audio src='https://s3.amazonaws.com/seeandsay/horse.mp3' />" + "Would you like to try again?",
    AnimalPic: 'horses',
    abbreviation: '20',
    token: '20',
  },
  {
    AnimalName: 'Lamb',
    AnimalHint: 'Touch or say give me a lamb fact.',
    AnimalSound: "The lamb says" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />" + "Would you like to try again?",
    AnimalPic: 'sheeps',
    abbreviation: '21',
    token: '21',
  },
  {
    AnimalName: 'Lion',
    AnimalHint: 'Touch or say give me a lion fact.',
    AnimalSound: "The lion says" + "<audio src='https://s3.amazonaws.com/seeandsay/lion.mp3' />" + "Would you like to try again?",
    AnimalPic: 'lions',
    abbreviation: '22',
    token: '22',
  },
  {
    AnimalName: 'Monkey',
    AnimalHint: 'Touch or say give me a monkey fact.',
    AnimalSound: "The monkey says" + "<audio src='https://s3.amazonaws.com/seeandsay/monkey.mp3' />" + "Would you like to try again?",
    AnimalPic: 'monkeys',
    abbreviation: '23',
    token: '23',
  },
  {
    AnimalName: 'Owl',
    AnimalHint: 'Touch or say give me a owl fact.',
    AnimalSound: "The owl says" + "<audio src='https://s3.amazonaws.com/seeandsay/owlhoot.mp3' />" + "Would you like to try again?",
    AnimalPic: 'owls',
    abbreviation: '24',
    token: '24',
  },
  {
    AnimalName: 'Mouse',
    AnimalHint: 'Touch or say give me a mouse fact.',
    AnimalSound: "The mouse says" + "<audio src='https://s3.amazonaws.com/seeandsay/mouse.mp3' />" + "Would you like to try again?",
    AnimalPic: 'mousess',
    abbreviation: '25',
    token: '25',
  },
  {
    AnimalName: 'Parrot',
    AnimalHint: 'Touch or say give me a parrot fact.',
    AnimalSound: "The parrot says" + "<audio src='https://s3.amazonaws.com/seeandsay/parrot.mp3' />" + "Would you like to try again?",
    AnimalPic: 'parrotss',
    abbreviation: '26',
    token: '26',
  },
  {
    AnimalName: 'Penguin',
    AnimalHint: 'Touch or say give me a penguin fact.',
    AnimalSound: "The penguin says" + "<audio src='https://s3.amazonaws.com/seeandsay/penguin.mp3' />" + "Would you like to try again?",
    AnimalPic: 'penguinss',
    abbreviation: '27',
    token: '27',
  },
  {
    AnimalName: 'Pigs',
    AnimalHint: 'Touch or say give me a pig fact.',
    AnimalSound: "The pig says" + "<audio src='https://s3.amazonaws.com/seeandsay/pig.mp3' />" + "Would you like to try again?",
    AnimalPic: 'pigs',
    abbreviation: '28',
    token: '28',
  },
  {
    AnimalName: 'Rabbit',
    AnimalHint: 'Touch or say give me a rabbit fact.',
    AnimalSound: "The rabbit says" + "<audio src='https://s3.amazonaws.com/seeandsay/rabbit.mp3' />" + "Would you like to try again?",
    AnimalPic: 'rabbitss',
    abbreviation: '29',
    token: '29',
  },
  {
    AnimalName: 'Rooster',
    AnimalHint: 'Touch or say give me a rooster fact.',
    AnimalSound: "The rooster says" + "<audio src='https://s3.amazonaws.com/seeandsay/roosterSF.mp3' />" + "Would you like to try again?",
    AnimalPic: 'roosters',
    abbreviation: '30',
    token: '30',
  },
  {
    AnimalName: 'Sea Lion',
    AnimalHint: 'Touch or say give me a sea lion fact.',
    AnimalSound: "The sea lion says" + "<audio src='https://s3.amazonaws.com/seeandsay/sealion.mp3' />" + "Would you like to try again?",
    AnimalPic: 'seaLionss',
    abbreviation: '31',
    token: '31',
  },
  {
    AnimalName: 'Seal',
    AnimalHint: 'Touch or say give me a seal fact.',
    AnimalSound: "The seal says" + "<audio src='https://s3.amazonaws.com/seeandsay/seal.mp3' />" + "Would you like to try again?",
    AnimalPic: 'sealss',
    abbreviation: '32',
    token: '32',
  },
  {
    AnimalName: 'Sheep',
    AnimalHint: 'Touch or say give me a sheep fact.',
    AnimalSound: "The sheep says" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />" + "Would you like to try again?",
    AnimalPic: 'sheeps',
    abbreviation: '33',
    token: '33',
  },
  {
    AnimalName: 'Tiger',
    AnimalHint: 'Touch or say give me a tiger fact.',
    AnimalSound: "The tiger says" + "<audio src='https://s3.amazonaws.com/seeandsay/tiger.mp3' />" + "Would you like to try again?",
    AnimalPic: 'tigerss',
    abbreviation: '34',
    token: '34',
  },
  {
    AnimalName: 'Toucan',
    AnimalHint: 'Touch or say give me a toucan fact.',
    AnimalSound: "The toucan says" + "<audio src='https://s3.amazonaws.com/seeandsay/toucan.mp3' />" + "Would you like to try again?",
    AnimalPic: 'toucanss',
    abbreviation: '35',
    token: '35',
  },
  {
    AnimalName: 'Whale',
    AnimalHint: 'Touch or say give me a whale fact.',
    AnimalSound: "The whale says" + "<audio src='https://s3.amazonaws.com/seeandsay/whale.mp3' />" + "Would you like to try again?",
    AnimalPic: 'whaless',
    abbreviation: '36',
    token: '36',
  },
];
/////////////////////////////////////////////
const imagePath = 'https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/{A}._AC_BG00,00,00_SR{W},{H}TTH_.png';
const backgroundImagePath = 'https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/{A}._AC_GR_BG00,00,00_SR{W},{H}TTH_.png';
const data = [
  {
    StateName: 'Alaska', Abbreviation: 'AK', Capital: 'Juneau', StatehoodYear: 1959, StatehoodOrder: 49,
  },
  {
    StateName: 'Colorado', Abbreviation: 'CO', Capital: 'Denver', StatehoodYear: 1876, StatehoodOrder: 38,
  },
  {
    StateName: 'Minnesota', Abbreviation: 'MN', Capital: 'St. Paul', StatehoodYear: 1858, StatehoodOrder: 32,
  },
  {
    StateName: 'New Mexico', Abbreviation: 'NM', Capital: 'Santa Fe', StatehoodYear: 1912, StatehoodOrder: 47,
  },
  {
    StateName: 'Washington', Abbreviation: 'WA', Capital: 'Olympia', StatehoodYear: 1889, StatehoodOrder: 42,
  },
];
const defaultItemToken = 'WA';
/////////////////////////////////////////////

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest')
        && request.intent.name === 'AMAZON.NavigateHomeIntent'
        || request.intent.name === 'AMAZON.MoreIntent';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const imgHeight = [280];
    const imgWidth = [280];

    let speechOutput = 'Welcome to See Say Touch, use your finger to select the animal you want to hear.';
    let repromptOutput = 'Use your finger to select the animal you want to hear.';

    if (supportsDisplay(handlerInput)) {
      const statesList = [];
      data.forEach((x) => {
        const stateImage = new Alexa.ImageHelper().withDescription(`${x.StateName} state flag`);
        for (let y = 0; y < imgHeight.length; y += 1) {
          stateImage.addImageInstance(getImageUrl(imgHeight[y], imgWidth[y], x.Abbreviation));
        }
        statesList.push({
          token: x.Abbreviation,
          textContent: new Alexa.PlainTextContentHelper()
            .withPrimaryText(x.StateName)
            .withSecondaryText(`Abbreviation: ${x.Abbreviation}`)
            .withTertiaryText(`Capital: ${x.Capital}`)
            .getTextContent(),
          image: stateImage.getImage(),
        });
      });
      responseBuilder.addRenderTemplateDirective({
        type:'ListTemplate2',
        token: 'listToken',
        backButton: 'hidden',
        title: 'I list things',
        listItems: statesList,
      });
    }
    return responseBuilder.speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const BodyTemplateHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
        return (request.type === 'IntentRequest' &&
            request.intent.name === 'BodyTemplateSelectionIntent')
            || request.type === 'Display.ElementSelected';
    },
    handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const request = handlerInput.requestEnvelope.request;
    let selectedState;
    let speechOutput;

    if (handlerInput.requestEnvelope.request.type === 'Display.ElementSelected') {
      // need to fetch token and then look up item from that
      const selectedToken = handlerInput.requestEnvelope.request.token;
      selectedState = getItemByAbbreviation(selectedToken);
    } else {
      // must be an intent
      let slotIdValue;
      if (request.intent.slots &&
          request.intent.slots.templateSelection &&
          request.intent.slots.templateSelection.value &&
          request.intent.slots.templateSelection.resolutions &&
          request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority &&
          request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority[0] &&
          request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority[0].values &&
          request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority[0].values[0] &&
          request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority[0].values[0].value &&
          request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority[0].values[0].value.name) {
        slotIdValue = request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        selectedState = getItemByAbbreviation(slotIdValue);
      }
    }

    if (!selectedState) {
      selectedState = getItemByAbbreviation(defaultItemToken);
    }

    responseBuilder.withStandardCard(
      getCardTitle(selectedState),
      getSpeechDescription(selectedState),
      getSmallImage(selectedState.Abbreviation),
      getLargeImage(selectedState.Abbreviation),
    );

    speechOutput = getSpeechDescription(selectedState);

    if (supportsDisplay(handlerInput)) {
      const image = new Alexa.ImageHelper()
        .addImageInstance(getLargeImage(selectedState.Abbreviation))
        .getImage();
      const bgImage = new Alexa.ImageHelper()
        .addImageInstance(getBackgroundImage(800, 1200, selectedState.Abbreviation))
        .getImage();
      const title = getCardTitle(selectedState);
      const bodyTemplate = bodyTemplateChoice(getCardTitle(selectedState));
      const primaryText = new Alexa.RichTextContentHelper()
        .withPrimaryText(getSpeechDescription(selectedState, '<br/>'))
        .getTextContent();
      responseBuilder.addRenderTemplateDirective({
        type: bodyTemplate,
        backButton: 'visible',
        backgroundImage: bgImage,
        image,
        title,
        textContent: primaryText,
      });
      speechOutput = 'This is the template, also known as body template number';
    }


    return responseBuilder.speak(speechOutput)
      .reprompt(speechOutput)
      .getResponse();
  },
};

//////////////////////////////////
function bodyTemplateChoice(pStateName) {
  let templateName;

  switch (pStateName) {
    case 'alligator':
      templateName = 'BodyTemplate3';
      break;
    case 'bat':
      templateName = 'BodyTemplate3';
      break;
    case 'bear':
      templateName = 'BodyTemplate3';
      break;
    case 'bee':
      templateName = 'BodyTemplate3';
      break;
    case 'cat':
      templateName = 'BodyTemplate3';
      break;
    default:
      templateName = 'BodyTemplate3';
  }
  return templateName;
}

function getCardTitle(item) {
  return item.StateName;
}

function getSmallImage(stateAbbreviation) {
  return getImageUrl(400, 720, stateAbbreviation);
}

function getLargeImage(stateAbbreviation) {
  return getImageUrl(800, 1200, stateAbbreviation);
}

function getImageUrl(height, width, stateAbbreviation) {
  return imagePath.replace('{H}', height)
    .replace('{W}', width)
    .replace('{A}', stateAbbreviation);
}

function getBackgroundImage(height, width, stateAbbreviation) {
  return backgroundImagePath.replace('{H}', height)
    .replace('{W}', width)
    .replace('{A}', stateAbbreviation);
}

function getSpeechDescription(item) {
  return 'is the state, admitted to the Union in .  The capital of and the abbreviation for';
}

function formatCasing(key) {
  return key.split(/(?=[A-Z])/).join(' ');
}

function getItemByAbbreviation(abbreviation) {
  const propertyArray = Object.getOwnPropertyNames(data[0]);
  let slotValue;

  for (const property in propertyArray) {
    if (Object.prototype.hasOwnProperty.call(propertyArray, property)) {
      const item = data.filter(x => x[propertyArray[property]]
        .toString().toLowerCase() === abbreviation.toLowerCase());
      if (item.length > 0) {
        return item[0];
      }
    }
  }
  return slotValue;
}

function getTextDescription(item) {
  let text = 'Here are some facts about the state you selected: \n';

  for (const key in item) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      text += `${formatCasing(key)}: ${item[key]}\n`;
    }
  }
  return text;
}

/////////////////////////////////////////////

function getAnimalName(AnimalName) {

    let list = [];
    for (let i = 0; i < dataVoice.sounds.length; i++) {

        if(dataVoice.sounds[i].AnimalName.search(AnimalName) >  -1) {
            list.push(dataVoice.sounds[i]);
        }
    }
    return list;
}

function randomArrayElement(array) {
    let i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}

///////////////////////////////////////////
function handleUnknown(HandlerInput) {
    //For when Alexa doesn't understand the user
    var speechOutput = 'it worked';
    var reprompt = 'it worked';

    const response = HandlerInput.responseBuilder;


    return response.speak(speechOutput).reprompt(reprompt).getResponse();
}



const randomAnimalsIntentHandler = {
        canHandle(handlerInput) {
          return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && (handlerInput.requestEnvelope.request.intent.name === 'randomAnimalsIntent');
  },
  handle(handlerInput) {

          const responseBuilder = handlerInput.responseBuilder;
          const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

          const sounds = randomArrayElement(getAnimalName(''));

          sessionAttributes.sounds = sounds.AnimalName;
          sessionAttributes.sounds = sounds.AnimalSound;
          sessionAttributes.sounds = sounds.AnimalFact;
          sessionAttributes.sounds = sounds.SmallImage;
          sessionAttributes.sounds = sounds.LargeImage;

          const cardTitle = "Here's your fun animal fact!";
          const cardText = sounds.AnimalName +"\n"+ sounds.AnimalFact  +"\n"+ "Next try the"+ "\n" + cookbook.getRandomItem(nameAnimal) + "!";
          const SIMAGE = sounds.SmallImage;
          const LIMAGE = sounds.LargeImage;
          const speechOutput = cookbook.getRandomItem(pulls) + sounds.AnimalSound + BREAK + "Would you like to try again?";
          const reprompt = speechOutput;

          return responseBuilder
              .speak(speechOutput)
              .reprompt(reprompt)
              .withStandardCard(cardTitle, cardText, SIMAGE, LIMAGE)
              .getResponse();
    },
};

const allIntentHandler = {
        canHandle(handlerInput) {
          return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && (handlerInput.requestEnvelope.request.intent.name === 'allIntent');
  },
  handle(handlerInput) {

        const pullRandom = cookbook.getRandomItem(pulls);
        const cardTitle = "Here's your fun animal fact!";
        const speechOutput = pullRandom + cookbook.getRandomItem(manySound) + BREAK + "Would you like to try again?";
        const cardText = cookbook.getRandomItem(facts);
        const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/cardS.png";
        const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/cardL.png";

        return handlerInput.responseBuilder
          .speak(speechOutput)
          .reprompt(speechOutput)
          .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
          .getResponse();
    },
};

const alligatorIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'alligatorIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun alligator fact!";
    const speechOutput = pullRandom + "The alligator says" + "<audio src='https://s3.amazonaws.com/seeandsay/aligator.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(alligatorFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/alligators.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/alligatorsb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const batsIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'batsIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun bats fact!";
    const speechOutput = pullRandom + "The bat says" + "<audio src='https://s3.amazonaws.com/seeandsay/bats.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(batsFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/bats.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/batl.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const bearIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'bearIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun bear fact!";
    const speechOutput = pullRandom + "The bear says" + "<audio src='https://s3.amazonaws.com/seeandsay/bear.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(bearFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/bear.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/bearb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const beeIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'beeIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun bee fact!";
    const speechOutput = pullRandom + "The bumble bee says" + "<audio src='https://s3.amazonaws.com/seeandsay/bee.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(beesFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/bees.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/beel.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const birdIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'birdIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun bird fact!";
    const speechOutput = pullRandom + "The bird says" + "<audio src='https://s3.amazonaws.com/seeandsay/bird.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(birdFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/birds.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/birdb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const catIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'catIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun cat fact!";
    const speechOutput = pullRandom + "The cat says" + "<audio src='https://s3.amazonaws.com/seeandsay/cat.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(catFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/cats.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/catb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const chickenIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'chickenIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun chicken fact!";
    const speechOutput = pullRandom + "The chicken says" + "<audio src='https://s3.amazonaws.com/seeandsay/roosterSF.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(chickenFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/chicken.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/chickenb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const cowIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'cowIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun cow fact!";
    const speechOutput = pullRandom + "The cow says" + "<audio src='https://s3.amazonaws.com/seeandsay/cowmoo.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(cowFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/cows.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/cowb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const dogIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'dogIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun dog fact!";
    const speechOutput = pullRandom + "The dog says" + "<audio src='https://s3.amazonaws.com/seeandsay/dog.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(dogFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/dog.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/dogb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const donkeyIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'donkeyIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun donkey fact!";
    const speechOutput = pullRandom + "The donkey says" + "<audio src='https://s3.amazonaws.com/seeandsay/donkey.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(donkeyFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/donkey.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/donkeyb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const duckIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'duckIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun duck fact!";
    const speechOutput = pullRandom + "The duck says" + "<audio src='https://s3.amazonaws.com/seeandsay/duck.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(duckFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/duck.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/duckb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const eagleIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'eagleIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun eagle fact!";
    const speechOutput = pullRandom + "The eagle says" + "<audio src='https://s3.amazonaws.com/seeandsay/baldEagle.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(baldEagleFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/baldEagles.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/baldEaglel.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const elephantIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'elephantIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun elephant fact!";
    const speechOutput = pullRandom + "The elephant says" + "<audio src='https://s3.amazonaws.com/seeandsay/elephant.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(elephantFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/elephant.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/elephantb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const frogIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'frogIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun frog fact!";
    const speechOutput = pullRandom + "The frog says" + "<audio src='https://s3.amazonaws.com/seeandsay/frog.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(frogFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/frog.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/frogb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const foxIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'foxIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun fox fact!";
    const speechOutput = pullRandom + "The fox says" + "<audio src='https://s3.amazonaws.com/seeandsay/fox.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(foxFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/fox.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/foxb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const goatIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'goatIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun goat fact!";
    const speechOutput = pullRandom + "The goat says" + "<audio src='https://s3.amazonaws.com/seeandsay/goat.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(goatFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/goats.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/goat.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const guineaPigIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'guineaPigIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun guinea pig fact!";
    const speechOutput = pullRandom + "The guinea pig says" + "<audio src='https://s3.amazonaws.com/seeandsay/guineapig.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(guineaPigFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/guineaps.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/guineapb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const hippoIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'hippoIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun hippopotamuses fact!";
    const speechOutput = pullRandom + "The Hippopotamuses says" + "<audio src='https://s3.amazonaws.com/seeandsay/hippo.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(hippoFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/hippo.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/hippob.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const horseIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'horseIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun horse fact!";
    const speechOutput = pullRandom + "The horse says" + "<audio src='https://s3.amazonaws.com/seeandsay/horse.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(horseFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/horse.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/horseb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const lambIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'lambIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun lamb fact!";
    const speechOutput = pullRandom + "The lamb says" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(sheepFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/sheep.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/sheepb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const lionIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'lionIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun lion fact!";
    const speechOutput = pullRandom + "The lion says" + "<audio src='https://s3.amazonaws.com/seeandsay/lion.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(lionFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/lion.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/lionb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const monkeyIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'monkeyIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun monkey fact!";
    const speechOutput = pullRandom + "The monkey says" + "<audio src='https://s3.amazonaws.com/seeandsay/monkey.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(monkeyFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/monkey.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/monkeyb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const mouseIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'mouseIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun mouse fact!";
    const speechOutput = pullRandom + "The mouse says" + "<audio src='https://s3.amazonaws.com/seeandsay/mouse.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(mouseFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/mouses.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/mouseb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const owlIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'owlIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun owl fact!";
    const speechOutput = pullRandom + "The owl says" + "<audio src='https://s3.amazonaws.com/seeandsay/owlhoot.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(owlFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/owl.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/owlb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const parrotIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'parrotIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun parrot fact!";
    const speechOutput = pullRandom + "The parrot says" + "<audio src='https://s3.amazonaws.com/seeandsay/parrot.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(parrotFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/parrots.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/parrotl.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const penguinIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'penguinIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun penguin fact!";
    const speechOutput = pullRandom + "The penguin says" + "<audio src='https://s3.amazonaws.com/seeandsay/penguin.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(penguinFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/penguins.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/penguinl.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const pigIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'pigIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun pig fact!";
    const speechOutput = pullRandom + "The pig says" + "<audio src='https://s3.amazonaws.com/seeandsay/pig.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(pigFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/pig.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/piigb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const rabbitIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'rabbitIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun rabbit fact!";
    const speechOutput = pullRandom + "The rabbit says" + "<audio src='https://s3.amazonaws.com/seeandsay/rabbit.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(rabbitFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/rabbits.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/rabbitb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const roosterIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'roosterIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun rooster fact!";
    const speechOutput = pullRandom + "The rooster says" + "<audio src='https://s3.amazonaws.com/seeandsay/roosterSF.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(chickenFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/rooster.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/roosterb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const sealIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'sealIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun seal fact!";
    const speechOutput = pullRandom + "The seal says" + "<audio src='https://s3.amazonaws.com/seeandsay/seal.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(sealFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/seals.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/sealb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const seaLionIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'seaLionIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun sea Lion fact!";
    const speechOutput = pullRandom + "The sea lion says" + "<audio src='https://s3.amazonaws.com/seeandsay/sealion.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(seaLionFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/seaLions.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/seaLionb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const sheepIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'sheepIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun sheep fact!";
    const speechOutput = pullRandom + "The sheep says" + "<audio src='https://s3.amazonaws.com/seeandsay/lamb.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(sheepFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/sheep.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/sheepb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const tigerIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'tigerIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun tiger fact!";
    const speechOutput = pullRandom + "The tiger says" + "<audio src='https://s3.amazonaws.com/seeandsay/tiger.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(tigerFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/tigers.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/tigerb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const toucanIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'toucanIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun toucan fact!";
    const speechOutput = pullRandom + "The toucan says" + "<audio src='https://s3.amazonaws.com/seeandsay/toucan.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(toucanFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/toucans.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/toucanb.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const whaleIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'whaleIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun whale fact!";
    const speechOutput = pullRandom + "The whale says" + "<audio src='https://s3.amazonaws.com/seeandsay/whale.mp3' />" + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(whaleFacts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/whales.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/whalel.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const factIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'factIntent');
  },
  handle(handlerInput) {

    const pullRandom = cookbook.getRandomItem(pulls);
    const cardTitle = "Here's your fun animal fact!";
    const speechOutput = pullRandom + cookbook.getRandomItem(facts) + BREAK + "Would you like to try again?";
    const cardText = cookbook.getRandomItem(facts);
    const SMALLIMAGE = "https://s3.amazonaws.com/seeandsay/cardS.png";
    const LARGEIMAGE = "https://s3.amazonaws.com/seeandsay/cardL.png";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent');
  },
  handle(handlerInput) {
    const cardTitle = HELP_PROMPT;
    const speechOutput = "Spin the wheel. \n Pull the handle. \n Spin it. \n Pull it. \n You can also ask for an animal by there name. \n Alligator, Bats, Bald Eagle, Bear, Bees, Bird, Cat, \n Cow, Dog, Donkey, Duck, Elephant, Fox \n Frog, Goat, Guinea Pig, Hippopotamuses, Horse, Lion, Monkey, Mouse,  \n Owl, Parrot, Penguin, Pig, Rabbit, Rooster \n Seal, Sea Lion, Sheep, Tiger, Toucan, Whale  ";
    const reprompt = "What else can I help you with?";
    const cardText = "Spin the wheel. \n Pull the handle. \n Spin it. \n Pull it. \n You can also ask for an animal by there name. \n Alligator, Bats, Bald Eagle, Bear, Bees, Bird, Cat, \n Cow, Dog, Donkey, Duck, Elephant, Fox \n Frog, Goat, Guinea Pig, Hippopotamuses, Horse, Lion, Monkey, Mouse,  \n Owl, Parrot, Penguin, Pig, Rabbit, Rooster \n Seal, Sea Lion, Sheep, Tiger, Toucan, Whale  ";

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(reprompt)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
        || handlerInput.requestEnvelope.request.type === 'SessionEndedRequest');
  },
  handle(handlerInput) {
    const cardTitle = "We hope to hear from you soon!";
    const speechOutput = cookbook.getRandomItem(goodByes);
    const stopmessage = STOP_MESSAGE + 'Please tell your friends and leave us a review!';

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withStandardCard(cardTitle, stopmessage, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const stop = (`Error handled: ${error.message}`);
    const cardTitle = "Your error is";

    return handlerInput.responseBuilder
      .speak('Sorry, error!')
      .withSimpleCard(cardTitle, stop)
      .reprompt('Sorry, error Please say again.')
      .getResponse();
  },
};

/////////////////////////////////////////////
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    BodyTemplateHandler,
    randomAnimalsIntentHandler,
    allIntentHandler,
    alligatorIntentHandler,
    batsIntentHandler,
    bearIntentHandler,
    beeIntentHandler,
    birdIntentHandler,
    catIntentHandler,
    chickenIntentHandler,
    cowIntentHandler,
    dogIntentHandler,
    donkeyIntentHandler,
    duckIntentHandler,
    eagleIntentHandler,
    elephantIntentHandler,
    foxIntentHandler,
    frogIntentHandler,
    goatIntentHandler,
    guineaPigIntentHandler,
    hippoIntentHandler,
    horseIntentHandler,
    lionIntentHandler,
    lambIntentHandler,
    monkeyIntentHandler,
    mouseIntentHandler,
    owlIntentHandler,
    parrotIntentHandler,
    penguinIntentHandler,
    pigIntentHandler,
    rabbitIntentHandler,
    roosterIntentHandler,
    seaLionIntentHandler,
    sealIntentHandler,
    sheepIntentHandler,
    tigerIntentHandler,
    toucanIntentHandler,
    whaleIntentHandler,
    factIntentHandler,
    HelpIntentHandler,
    SessionEndedRequestHandler,
    CancelAndStopIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

///////////////////ALEXASHOW///////////////
function supportsDisplay(handlerInput) {
  const hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
  return hasDisplay;
}
//////////////////////////////////////////////
