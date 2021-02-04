export class SmalgJavascriptAssertion {

  fail(message) {
    throw new Error(message);
  }

  assertEquals(expected, atual, errorMessage) {
    let invalid;
    if (expected && expected.equals) {
      invalid = !expected.equals(atual);
    } else if (atual && atual.equals) {
      invalid = !atual.equals(expected);
    } else {
      invalid = expected !== atual;
    }
    if (invalid) {
      throw Error(`Esperado: ${expected}. Atual: ${atual}. Mensagem: ${errorMessage}`);
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
