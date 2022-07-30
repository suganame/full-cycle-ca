import ParkingLotAdapter from "../../adapter/ParkingLotAdapters";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";
import database from '../database/database'

export default class ParkingLotRepositorySQL implements ParkingLotRepository {
  async getParkingLot(code: string): Promise<ParkingLot> {
    const parkingLotData = await database.oneOrNone("select *, (select count(*) from example.parked_car pc where pc_code = pl.code )::int as occupied_spaces from example.parking_lot pl where code = $1", [code]);
    return  ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.openHour, parkingLotData.closeHour, parkingLotData.occupiedSpaces);
  }
  async saveParkedCar(code: string, plate: string, date: Date): Promise<void> {
    await database.none("insert into example.parked_car (code, plate, date) values ($1, $2, $3)", [code, plate, date]);
  }

}