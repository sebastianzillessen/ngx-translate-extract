import { expect } from 'chai';

import { TranslationCollection } from '../../src/utils/translation.collection';

describe('StringCollection', () => {

	let collection: TranslationCollection;

	beforeEach(() => {
		collection = new TranslationCollection();
	});

	it('should initialize with key/value pairs', () => {
		collection = new TranslationCollection({key1: 'val1', key2: 'val2'});
		expect(collection.values).to.deep.equal({key1: 'val1', key2: 'val2'});
	});

	it('should add key with value', () => {
		const newCollection = collection.add('theKey', 'theVal');
		expect(newCollection.get('theKey')).to.equal('theVal');
	});

	it('should add key with default value', () => {
		collection = collection.add('theKey');
		expect(collection.get('theKey')).to.equal('theKey');
	});

	it('should not mutate collection when adding key', () => {
		collection.add('theKey', 'theVal');
		expect(collection.has('theKey')).to.equal(false);
	});

	it('should add array of keys with default value', () => {
		collection = collection.addKeys(['key1', 'key2']);
		expect(collection.values).to.deep.equal({key1: 'key1', key2: 'key2'});
	});

	it('should return true when collection has key', () => {
		collection = collection.add('key');
		expect(collection.has('key')).to.equal(true);
	});

	it('should return false when collection does not have key', () => {
		expect(collection.has('key')).to.equal(false);
	});

	it('should remove key', () => {
		collection = new TranslationCollection({removeThisKey: ''});
		collection = collection.remove('removeThisKey');
		expect(collection.has('removeThisKey')).to.equal(false);
	});

	it('should not mutate collection when removing key', () => {
		collection = new TranslationCollection({removeThisKey: ''});
		collection.remove('removeThisKey');
		expect(collection.has('removeThisKey')).to.equal(true);
	});

	it('should return number of keys', () => {
		collection = collection.addKeys(['key1', 'key2', 'key3']);
		expect(collection.count()).to.equal(3);
	});

	it('should merge with other collection', () => {
		collection = collection.add('oldKey', 'oldVal');
		const newCollection = new TranslationCollection({newKey: 'newVal'});
		expect(collection.union(newCollection).values).to.deep.equal({oldKey: 'oldVal', newKey: 'newVal'});
	});

	it('should intersect with passed collection', () => {
		collection = collection.addKeys(['red', 'green', 'blue']);
		const newCollection = new TranslationCollection({red: 'red', blue: 'blue'});
		expect(collection.intersect(newCollection).values).to.deep.equal({red: 'red', blue: 'blue'});
	});

	it('should intersect with passed collection and keep original values', () => {
		collection = new TranslationCollection({cat: 'cøt', dog: 'døg', bird: 'børd'});
		const newCollection = new TranslationCollection({cat: 'no value', bird: 'also no value'});
		expect(collection.intersect(newCollection).values).to.deep.equal({cat: 'cøt', bird: 'børd'});
	});

	it('should sort translations in alphabetical order', () => {
		collection = new TranslationCollection({red: 'rød', green: 'grøn', blue: 'blå'});
		collection = collection.sort();
		expect(collection.keys()).deep.equal(['blue', 'green', 'red']);
	});

	it('should sort translations in alphabetical order for deep objects', () => {
		collection = new TranslationCollection({red: 'rød', green: 'grøn', blue: 'blå', 'alpha.b': '1', 'alpha.a': '2'});
		collection = collection.sort();
		expect(collection.keys()).deep.equal(['alpha.a', 'alpha.b', 'blue', 'green', 'red']);
	});

});
