export const $unwrap = (collection: any) => collection[0];

export const $id = (cytoscape: any, id: string) => $unwrap(cytoscape.$id(id));


