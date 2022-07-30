import EnterParkingLot from "../src/core/usecase/EnterParkingLot";
import GetParkingLot from "../src/core/usecase/GetParkingLot";
import ParkingLotRepositoryMemory from "../src/infra/repository/ParkingLotRepositoryMemory";
import ParkingLotRepositorySQL from "../src/infra/repository/ParkingLotRepositorySQL";

test('should get parking lot', async () => {
  const parkingLotRepositorySQL = new ParkingLotRepositorySQL()
  const getParkingLot = new GetParkingLot(parkingLotRepositorySQL)
  const parkingLot = await getParkingLot.execute('shopping')
  expect(parkingLot.code).toBe("shopping")
});

test.skip('should enter parking lot', async () => {
  const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory()
  const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory)
  const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory)
  const parkingLotBeforeEnter = await getParkingLot.execute('shopping');
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);
  await enterParkingLot.execute("shopping", "FWE-9224", new Date('2021-03-01T10:00:00'))
  const parkingLotAfterEnter = await getParkingLot.execute('shopping');
  expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);
  // expect(parkingLot.code).toBe("shopping");
});

test.skip('should be closed', async () => {
  const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory()
  const parkingLotRepositorySQL = new ParkingLotRepositorySQL()
  const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory)
  const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory)
  const parkingLotBeforeEnter = await getParkingLot.execute('shopping');
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);
  await enterParkingLot.execute("shopping", "FWE-9224", new Date('2021-03-01T23:00:00'))
});

test.skip('should be full', async () => {
  const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory()
  const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory)
  const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory)
  const parkingLotBeforeEnter = await getParkingLot.execute('shopping');
  expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);
  await enterParkingLot.execute("shopping", "FWE-9224", new Date('2021-03-01T10:00:00'))
  await enterParkingLot.execute("shopping", "FWE-9224", new Date('2021-03-01T10:00:00'))
  await enterParkingLot.execute("shopping", "FWE-9224", new Date('2021-03-01T10:00:00'))
  await enterParkingLot.execute("shopping", "FWE-9224", new Date('2021-03-01T10:00:00'))
  await enterParkingLot.execute("shopping", "FWE-9224", new Date('2021-03-01T10:00:00'))
  await enterParkingLot.execute("shopping", "FWE-9224", new Date('2021-03-01T10:00:00'))
});