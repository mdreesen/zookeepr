const fs = require('fs');

const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');

const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test('create a zookeeper object', () => {
    const zookeeper = createNewZookeeper({ name: "Jenkins", id: "87234kjh234" },
        zookeepers
    );
    expect(zookeeper.name).toBe("Jenkins");
    expect(zookeeper.id).toBe("87234kjh234");
});

test('filter by query', () => {
    const startingZookeepers = [{
            "id": "0",
            "name": "Kim",
            "age": 28,
            "favoriteAnimal": "dolphin"
        },
        {
            "id": "1",
            "name": "Raksha",
            "age": 31,
            "favoriteAnimal": "penguin"
        }
    ]
    const updatedZookeeper = filterByQuery({ favoriteAnimal: "dolphin" }, startingZookeepers);
    expect(updatedZookeeper.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [{
            "id": "0",
            "name": "Kim",
            "age": 28,
            "favoriteAnimal": "dolphin"
        },
        {
            "id": "1",
            "name": "Raksha",
            "age": 31,
            "favoriteAnimal": "penguin"
        }
    ]
    const result = findById("0", startingZookeepers);
    expect(result.name).toBe("Kim");
});

test("validates age", () => {
    const zookeeper = {
        id: "2",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin",
    };

    const invalidZookeeper = {
        id: "3",
        name: "Isabella",
        age: "67",
        favoriteAnimal: "bear",
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});