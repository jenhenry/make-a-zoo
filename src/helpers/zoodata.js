const endangered_order = [
	'critical',
	'endangered',
	'vulnerable',
	'near_threatened',
	'species_dependent',
	'least_concern'
];

const preset_zoos = [
	{
		id: '010',
		name: 'Nashville Zoo',
		animals: [ '010', '020', '030', '040', '050', '070', '080', '100', '150', '160', '200', '210', '220' ]
	},
	{
		id: '020',
		name: 'San Diego Zoo',
		animals: [ '010', '070', '050', '130', '140', '160', '170', '180', '190', '200', '230', '240' ]
	},
	{
		id: '030',
		name: 'Woodland Park Zoo',
		animals: [ '010', '050', '030', '070', '160', '200', '230', '220', '240' ]
	},
	{
		id: '040',
		name: 'Bronx Zoo',
		animals: [ '140', '050', '070', '010', '030', '150', '160', '170', '220', '230' ]
	}
];

const zoo_animals = [
	{
		id: '010',
		common_name: 'Red Panda',
		img: 'redpanda.png',
		location: 'Himalayans and SW Asia',
		habitat: 'Temperate forests',
		food: 'Bamboo, berries, fruit, insects, young leaves, bark',
		factoid:
			'The red pandas were once thought to be relatives of raccoons and bears but research has now put them in their own animal family Ailuridae.',
		endangered: 'Endangered',
		filters: {
			location: 'asia',
			habitat: 'temperate_forests',
			type: 'mammals',
			status: 'endangered'
		}
	},
	{
		id: '020',
		common_name: 'Southern Pudu',
		img: 'pudu.png',
		location: 'Chile and Argentina',
		habitat: 'Temperate evergreen rainforests and deciduous forests',
		food: 'Fruit, plants, seeds and nuts',
		factoid:
			'The southern pudu is one of the world’s smallest deer, measuring just 14-17 inches in height at the shoulder.',
		endangered: 'Near Threatened',
		filters: {
			location: 'south_america',
			habitat: 'temperate_forests',
			type: 'mammals',
			status: 'near_threatened'
		}
	},
	{
		id: '030',
		common_name: 'Red Ruffed Lemur',
		img: 'redruffedlemur.png',
		location: 'Northeast Madagascar',
		habitat: 'Tropical forests',
		food: 'Fruit, nectar, pollen, leaves',
		factoid:
			'Red-ruffed lemurs are 1 of more than 100 species of lemurs on the island of Madagascar. Lemurs are not monkeys but a type of primate called a prosimian.',
		endangered: 'Critically Endangered',
		filters: {
			location: 'africa',
			habitat: 'tropical_forests',
			type: 'mammals',
			status: 'critical'
		}
	},
	{
		id: '040',
		common_name: 'Alpaca',
		img: 'alpaca2.png',
		location: 'Central/South Andes Mountains',
		habitat: 'Plateaus near wet, grassy areas',
		food: 'Leaves, wood, bark, stems',
		factoid: 'Alpacas can come in up to 22 colors.',
		endangered: 'Least Concern',
		filters: {
			location: 'south_america',
			habitat: 'plateaus',
			type: 'mammals',
			status: 'least_concern'
		}
	},
	{
		id: '050',
		common_name: 'Giraffe',
		img: 'giraffe.png',
		location: 'Africa',
		habitat: 'Dry savannahs, open forests, grasslands',
		food: 'Leaves, plants, fruits',
		factoid:
			'Giraffes have a neck that is 6 feet long and weighs 600 pounds. Their heart is 2 feet long and weighs 25 pounds. They eat about 75 pounds of food each day.',
		endangered: 'Species Dependent',
		filters: {
			location: 'africa',
			habitat: 'savannahs',
			type: 'mammals',
			status: 'species_dependent'
		}
	},
	{
		id: '060',
		common_name: 'Sea Turtle',
		img: 'seaturtle.png',
		location: 'Oceans worldwide',
		habitat: 'Mainly tropical and subtropical waters',
		food: 'Sea grasses and algae',
		factoid:
			'The diet of green turtles changes with age. Juveniles are carnivorous, but as they mature they become omnivorous. The young eat fish eggs, molluscs, jellyfish, small invertebrates, worms, sponges, algae, and crustaceans.',
		endangered: 'Endangered',
		filters: {
			location: 'all',
			habitat: 'tropical_waters',
			type: 'reptiles',
			status: 'endangered'
		}
	},
	{
		id: '070',
		common_name: 'Komodo Dragon',
		img: 'komodo.png',
		location: 'Indonesian islands',
		habitat: 'Open savannah areas',
		food: 'Boar, deer, carrion',
		factoid:
			'Adult Komodo Dragons can reach up to 10 feet long, and run 13mph. They can live more than 30 years in the wild.',
		endangered: 'Vulnerable',
		filters: {
			location: 'asia',
			habitat: 'savannahs',
			type: 'reptiles',
			status: 'vulnerable'
		}
	},
	{
		id: '080',
		common_name: 'Dwarf Caiman',
		img: 'dwarfcaiman.png',
		location: 'From Venezuela to Brazil',
		habitat: 'Freshwater rivers and streams',
		food: 'Fish, birds, reptiles, invertebrates, small mammals',
		factoid:
			'Dwarf caiman are the smallest species of crocodile. They like to live in flooded forests with clean and fast-flowing rivers in South America.',
		endangered: 'Least Concern',
		filters: {
			location: 'south_america',
			habitat: 'rivers',
			type: 'reptiles',
			status: 'least_concern'
		}
	},
	{
		id: '090',
		common_name: 'Borneo Pygmy Elephant',
		img: 'borneopygmyelephant.png',
		location: 'Borneo and Sumatra',
		habitat: 'Rainforest and tropical woodland',
		food: 'Grass, fruit, roots',
		factoid:
			'Unlike the African elephants, the female Borneo elephants very rarely have tusks. The pygmy elephants of Borneo are the smallest elephants in Asia.',
		endangered: 'Endangered',
		filters: {
			location: 'asia',
			habitat: 'rainforests',
			type: 'mammals',
			status: 'endangered'
		}
	},
	{
		id: '100',
		common_name: 'Meerkat',
		img: 'meerkat.png',
		location: 'Southern Africa',
		habitat: 'Dry savannah, plains',
		food: 'Insects, small invertebrates, eggs',
		factoid:
			'Meerkats are small mammals related to the mongoose. They live in underground burrows with up to 40 meerkats in groups called mobs.',
		endangered: 'Least Concern',
		filters: {
			location: 'africa',
			habitat: 'savannahs',
			type: 'mammals',
			status: 'least_concern'
		}
	},
	{
		id: '110',
		common_name: 'Rockhopper Penguin',
		img: 'srockhopperpenguin.png',
		location: 'Subantarctic Oceans',
		habitat: 'Green pastures, rocky coasts',
		food: 'Crustaceans, squid, plankton',
		factoid:
			"Rockhopper penguins return to the same breeding ground, each year, and usually seek out their previous year's mate. Both parents take turns incubating the eggs",
		endangered: 'Vulnerable',
		filters: {
			location: 'subantarctic',
			habitat: 'coastal_areas',
			type: 'birds',
			status: 'vulnerable'
		}
	},
	{
		id: '120',
		common_name: 'Sunda Pangolin',
		img: 'sundapangolin.png',
		location: 'Southeast Asia',
		habitat: 'Forests and grasslands',
		food: 'Termites and ants',
		factoid:
			'Pangolin scales are made of keratin, the substance human fingernails are made of. If threatened, they roll into a ball, hiding their vulnerable belly.',
		endangered: 'Critically Endangered',
		filters: {
			location: 'asia',
			habitat: 'forests', //[ 'forests', ' grasslands' ],
			type: 'mammals',
			status: 'critical'
		}
	},
	{
		id: '130',
		common_name: 'Arctic Fox',
		img: 'arcticfox.png',
		location: 'Polar regions',
		habitat: 'Tundra',
		food: 'Small rodents, sea birds, and fish',
		factoid:
			'Arctic foxes have excellent hearing. When hearing the next meal scurrying under the snow, the fox leaps into the air and pounces, breaking through the layer of snow right onto the prey underneath.',
		endangered: 'Least Concern',
		filters: {
			location: 'polar',
			habitat: 'tundras',
			type: 'mammals',
			status: 'least_concern'
		}
	},
	{
		id: '140',
		common_name: 'Fossa',
		img: 'fossa.png',
		location: 'Madagascar',
		habitat: 'Humid forest',
		food: 'Birds, lizards, mammals',
		factoid: 'A relative of the mongoose, the fossa is unique to the forests of Madagascar.',
		endangered: 'Vulnerable',
		filters: {
			location: 'africa',
			habitat: 'forests',
			type: 'mammals',
			status: 'vulnerable'
		}
	},
	{
		id: '150',
		common_name: 'Carribean Flamingo',
		img: 'caribflamingo.png',
		location: 'South Florida to South America',
		habitat: 'Tropical lagoons, salt water lakes',
		food: 'Mollusks, worms, aquatic plants',
		factoid:
			'Both males and females will help incubate the egg and care for the chick. Flamingos are filter feeders and hold their head upside down in shallow water to strain out their food.',
		endangered: 'Least Concern',
		filters: {
			location: 'south_america',
			habitat: 'tropical_waters',
			type: 'birds',
			status: 'least_concern'
		}
	},
	{
		id: '160',
		common_name: 'Plains Zebra',
		img: 'plainszebra.png',
		location: 'Eastern and Southern Africa',
		habitat: 'Open savannas, grasslands',
		food: 'Grasses, leaves, herbs, twigs',
		factoid:
			'Each zebra has a different pattern of stripes on their coat. The plains zebra is highly social and usually forms small family groups called harems.',
		endangered: 'Near Threatened',
		filters: {
			location: 'africa',
			habitat: 'savannahs',
			type: 'mammals',
			status: 'near_threatened'
		}
	},
	{
		id: '170',
		common_name: 'Bee Eater',
		img: 'beeeater.png',
		location: 'Sub-equatorial Africa',
		habitat: 'Open areas, sandy banks',
		food: 'Flying insects',
		factoid:
			'Most of the species in the family are monogamous, and both parents care for the young, sometimes with the assistance of other birds in the colony.',
		endangered: 'Least Concern',
		filters: {
			location: 'africa',
			habitat: 'cliffs',
			type: 'birds',
			status: 'least_concern'
		}
	},
	{
		id: '180',
		common_name: 'Capybara',
		img: 'capybara.png',
		location: 'South America',
		habitat: 'Forests near water',
		food: 'Grasses, aquatic plants, fruit, and tree bark',
		factoid: 'Capybaras are semiaquatic mammals and can hold their breath underwater for up to five minutes.',
		endangered: 'Least Concern',
		filters: {
			location: 'south_america',
			habitat: 'forests',
			type: 'mammals',
			status: 'least_concern'
		}
	},
	{
		id: '190',
		common_name: 'Koala',
		img: 'koala.png',
		location: 'Australia',
		habitat: 'Forests',
		food: 'Eucalyptus',
		factoid: 'Koalas are members of the marsupial family, and carry their newborns in rear-facing pouches.',
		endangered: 'Vulnerable',
		filters: {
			location: 'australia',
			habitat: 'forests',
			type: 'mammals',
			status: 'vulnerable'
		}
	},
	{
		id: '200',
		common_name: 'Two-toed Sloth',
		img: 'sloth.png',
		location: 'Amazonian South America',
		habitat: 'Lowland & montane forests',
		food: 'Fruit, leaves, nuts, bark',
		factoid: 'Sloths sleep up to 15 hours a day, and move at a speed of three meters per minute',
		endangered: 'Least Concern',
		filters: {
			location: 'south_america',
			habitat: 'forests',
			type: 'mammals',
			status: 'least_concern'
		}
	},
	{
		id: '210',
		common_name: 'Clouded Leopard',
		img: 'cloudedleopard.png',
		location: 'Southeast Asia',
		habitat: 'Tropical forests',
		food: 'Birds, fish, deer, small primates, rodents',
		factoid:
			'Clouded Leopards spend nearly all their lives in the trees. Their ankles can rotate backward so the cat can climb down a tree headfirst, climb upside down, and even hang from its back feet.',
		endangered: 'Vulnerable',
		filters: {
			location: 'asia',
			habitat: 'tropical_forests',
			type: 'mammals',
			status: 'vulnerable'
		}
	},
	{
		id: '220',
		common_name: 'Poison Dart Frog',
		img: 'poisondartfrog.png',
		location: 'Central and South America',
		habitat: 'Rainforests',
		food: 'Spiders, small invertebrates',
		factoid:
			'Hunters capture poison dart frogs and use the frog’s poison on the tips of their blow darts.The poison-dipped darts can be dried and stored for 10 years without losing their potency.',
		endangered: 'Threatened',
		filters: {
			location: 'south_america',
			habitat: 'rainforests',
			type: 'amphibians',
			status: 'threatened'
		}
	},
	{
		id: '230',
		common_name: 'Anaconda',
		img: 'anaconda.png',
		location: 'South America',
		habitat: 'Swamps and marshes',
		food: 'Mammals, birds, reptiles, amphibians, fish, and eggs',
		factoid:
			'The Anaconda is one of the largest snakes in the world. Like all boas and pythons, it is non-venomous and kills its prey by constriction.',
		endangered: 'Unknown',
		filters: {
			location: 'south_america',
			habitat: 'swamps',
			type: 'reptiles',
			status: 'unknown'
		}
	},
	{
		id: '240',
		common_name: 'Ocelot',
		img: 'ocelot.png',
		location: 'Central and South America',
		habitat: 'Tropical forests, swamps and savannah',
		food: 'Small mammals, small birds, fish, and reptiles',
		factoid:
			'The ocelot is both an excellent swimmer and climber. Abstract artist Salvador Dali kept a pet ocelot.',
		endangered: 'Least Concern',
		filters: {
			location: 'south_america',
			habitat: 'tropical_forests', //mangrove swamps and savannah
			type: 'mammals',
			status: 'least_concern'
		}
	}
];

/* 
,
	{
		id:"x",
		common_name: 'x',
		img: 'xx',
		location: 'x',
		habitat: 'x',
		food: 'x',
		factoid:
            'x',
        endangered: "x",
		filters: {
			location: 'x',
			habitat: 'x',
			type: 'x',
			status: 'x'
		}
    }
    */

export { zoo_animals, preset_zoos, endangered_order };
