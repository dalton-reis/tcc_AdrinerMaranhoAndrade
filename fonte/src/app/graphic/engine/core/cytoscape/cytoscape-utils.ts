export const $unwrap = (collection: any) => collection[0];

export const $id = (cytoscape: any, id: string) => $unwrap(cytoscape.$id(id));

export const $addRelation = (cytoscape: any, source: any, target: any) => {
  const sourceId = source.id();
  const targetId = target.id();
  return cytoscape.add({
    group: 'edges',
    data: { id: `${sourceId}_${targetId}`, source: sourceId, target: targetId },
    classes: ['relation'],
  });
};

export const $removeRelation = (cytoscape: any, el1: any, el2: any) => {
  const element1Id = el1.id();
  const element2Id = el2.id();
  const relation = $id(cytoscape, `${element1Id}_${element2Id}`) || $id(cytoscape, `${element1Id}_${element2Id}`);
  if (relation) cytoscape.remove(relation);
};

export const $add = async (cytoscape, element) => {
  const addPromise = new Promise((resolve) => cytoscape.promiseOn('add').then(event => resolve(event.target)));
  cytoscape.add(element);
  const ret = await addPromise;
  console.log(ret);
  return ret;
};


