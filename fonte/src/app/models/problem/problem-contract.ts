export interface FieldContract {

  name: string;
  description: string;

}

export interface MethodContract {

  name: string;
  parameters: string;
  description: string;

}

export interface ClassContract {

  fields: FieldContract[];
  methods: MethodContract[];

}
