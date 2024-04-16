export interface PokeApiSpecies {
    base_happiness: number;
    capture_rate: number;
    color: NameUrl;
    egg_groups: NameUrl[];
    evolution_chain: EvolutionChain;
    evolves_from_species: null;
    flavor_text_entries: FlavorTextEntry[];
    form_descriptions: never[];
    forms_switchable: boolean;
    gender_rate: number;
    genera: Genus[];
    generation: NameUrl;
    growth_rate: NameUrl;
    habitat: NameUrl;
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: Name[];
    order: number;
    pal_park_encounters: PalParkEncounter[];
    pokedex_numbers: PokedexNumber[];
    shape: NameUrl;
    varieties: Variety[];
}

export interface NameUrl {
    name: string;
    url: string;
}

export interface EvolutionChain {
    url: string;
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: NameUrl;
    version: NameUrl;
}

export interface Genus {
    genus: string;
    language: NameUrl;
}

export interface Name {
    language: NameUrl;
    name: string;
}

export interface PalParkEncounter {
    area: NameUrl;
    base_score: number;
    rate: number;
}

export interface PokedexNumber {
    entry_number: number;
    pokedex: NameUrl;
}

export interface Variety {
    is_default: boolean;
    pokemon: NameUrl;
}
