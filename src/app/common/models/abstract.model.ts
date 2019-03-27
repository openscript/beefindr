interface SerializedModel {
  id: string;
}

/**
 * Very basic implementation of model, equipped with
 * inflate/deflate mechanisms. Support for nested fields
 * not implemented...
 */
export abstract class AbstractModel {

  readonly id: string = '';

  /**
   * Constructor
   *
   * @param data Serialized data to be used to inflate the model instance
   */
  public constructor(data: object) {
    this.inflate(data);
  }

  /**
   * Serializes the model into an object/json.
   * Remove id to avoid shadowing the real
   * instance id governed by the database.
   */
  public deflate(): object {
    const deflated: SerializedModel = {...this};
    delete deflated.id;
    return deflated;
  }

  /**
   * Deserializes an object and inflates this
   * instance with data, for all keys/fields that are
   * defined in the model.
   *
   * @param data Data to be used to inflate the model instance
   */
  public inflate(data: object) {
    for (const key in data) {
      if (data.hasOwnProperty(key) && this.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
  }
}
