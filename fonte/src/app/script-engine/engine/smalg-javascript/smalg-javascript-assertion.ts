export class SmalgJavascriptAssertion {

  assertEquals(expected, atual, errorMessage) {
    if (expected !== atual) {
      throw Error(errorMessage);
    }
  }

  assertTrue(atual, errorMessage) {
    if (!atual) {
      throw Error(errorMessage);
    }
  }

  assertFalse(atual, errorMessage) {
    if (atual) {
      throw Error(errorMessage);
    }
  }

}
