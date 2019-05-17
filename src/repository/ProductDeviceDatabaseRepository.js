// @flow

import type { CollectionName } from './collectionNames';
import type {
  IBaseDatabase,
  IProductDeviceRepository,
  ProductDevice,
} from '../types';

import COLLECTION_NAMES from './collectionNames';
import BaseRepository from './BaseRepository';

class ProductDeviceDatabaseRepository extends BaseRepository
  implements IProductDeviceRepository {
  _database: IBaseDatabase;
  _collectionName: CollectionName = COLLECTION_NAMES.PRODUCT_DEVICES;

  constructor(database: IBaseDatabase) {
    super(database, COLLECTION_NAMES.PRODUCT_DEVICES);
    this._database = database;
  }

  countByProductID = (
    productID: number,
    query?: Object = {},
  ): Promise<number> =>
    this._database.count(this._collectionName, {
      ...query,
      productID,
    });

  create = async (model: $Shape<ProductDevice>): Promise<ProductDevice> =>
    await this._database.insertOne(this._collectionName, {
      ...model,
    });

  deleteByID = async (id: string): Promise<void> =>
    await this._database.remove(this._collectionName, { _id: id });

  getAll = async (userID: ?string = null): Promise<Array<ProductDevice>> => {
    // TODO - this should probably just query the organization
    const query = userID ? { ownerID: userID } : {};
    return await this._database.find(this._collectionName, query);
  };

  getAllByProductID = async (
    productID: number,
    skip: number,
    take: number,
  ): Promise<Array<ProductDevice>> =>
    await this._database.find(this._collectionName, {
      productID,
      skip,
      take,
    });

  getManyByProductID = async (
    productID: number,
    query?: Object,
  ): Promise<Array<ProductDevice>> =>
    this._database.find(this._collectionName, {
      ...query,
      productID,
    });

  getByID = async (id: string): Promise<?ProductDevice> =>
    await this._database.findOne(this._collectionName, { _id: id });

  getFromDeviceID = async (deviceID: string): Promise<?ProductDevice> =>
    await this._database.findOne(this._collectionName, {
      deviceID: deviceID.toLowerCase(),
    });

  getManyFromDeviceIDs = async (
    deviceIDs: Array<string>,
  ): Promise<Array<ProductDevice>> =>
    // todo  $in operator doesn't work for neDb(no matter with regexp or plain strings)
    await this._database.find(this._collectionName, {
      deviceID: {
        $in: deviceIDs.map(id => id.toLowerCase()),
      },
    });

  updateByID = async (
    productDeviceID: string,
    productDevice: ProductDevice,
  ): Promise<ProductDevice> =>
    await this._database.findAndModify(
      this._collectionName,
      { _id: productDeviceID },
      {
        $set: {
          ...productDevice,
          ...(productDevice.deviceID
            ? { deviceID: productDevice.deviceID.toLowerCase() }
            : {}),
        },
      },
    );

  deleteByProductID = async (productID: number): Promise<void> =>
    await this._database.remove(this._collectionName, {
      product_id: productID,
    });
}

export default ProductDeviceDatabaseRepository;
