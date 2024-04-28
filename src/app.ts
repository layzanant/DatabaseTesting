import express, { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { EmployeesController } from './controller/EmployeesController';
import { DriversController } from './controller/DriverController';
import { ShipmentsController } from './controller/ShipmentsController';
import { MechanicsController } from './controller/MechanicsController';
import { RepairsController } from './controller/RepairsController';
import { TrucksController } from './controller/TrucksController';
import { TruckTripsController } from './controller/TruckTripsController';

const app = express();

const driversController = new DriversController();
const employeesController = new EmployeesController();
const mechanicsController = new MechanicsController();
const repairsController = new RepairsController();
const shipmentsController = new ShipmentsController();
const trucksController = new TrucksController();
const truckTripsController = new TruckTripsController();

AppDataSource.initialize().then(() => {

    console.log("Data source initialized.");

    app.use(express.json());

    // Driver routes
    app.get('/drivers', (req: Request, res: Response) => {
        driversController.getDrivers(req, res);
    });
    app.get('/driver/:driverId', (req: Request, res: Response) => {
        driversController.getDriverById(req, res);
    });
    app.post('/driver', (req: Request, res: Response) => {
        driversController.createDriver(req, res);
    });
    app.put('/driver/:driverId', (req: Request, res: Response) => {
        driversController.updateDriver(req, res);
    });
    app.delete('/driver/:driverId', (req: Request, res: Response) => {
        driversController.deleteDriver(req, res);
    });

    // Employees routes
    app.get('/employees', (req: Request, res: Response) => {
        employeesController.getEmployees(req, res);
    });
    app.get('/employee/:employeeId', (req: Request, res: Response) => {
        employeesController.getEmployeeById(req, res);
    });
    app.post('/employee', (req: Request, res: Response) => {
        employeesController.createEmployee(req, res);
    });
    app.put('/employee/:employeeId', (req: Request, res: Response) => {
        employeesController.updateEmployee(req, res);
    });
    app.delete('/employee/:employeeId', (req: Request, res: Response) => {
        employeesController.deleteEmployee(req, res);
    });

    // Mechanics routes
    app.get('/mechanics', (req: Request, res: Response) => {
        mechanicsController.getMechanics(req, res);
    });
    app.get('/mechanic/:mechanicId', (req: Request, res: Response) => {
        mechanicsController.getMechanicById(req, res);
    });
    app.post('/mechanic', (req: Request, res: Response) => {
        mechanicsController.createMechanic(req, res);
    });
    app.put('/mechanic/:mechanicId', (req: Request, res: Response) => {
        mechanicsController.updateMechanic(req, res);
    });
    app.delete('/mechanic/:mechanicId', (req: Request, res: Response) => {
        mechanicsController.deleteMechanic(req, res);
    });

    // Repairs routes
    app.get('/repairs', (req: Request, res: Response) => {
        repairsController.getRepairs(req, res);
    });
    app.get('/repair/:repairId', (req: Request, res: Response) => {
        repairsController.getRepairById(req, res);
    });
    app.post('/repair', (req: Request, res: Response) => {
        repairsController.createRepair(req, res);
    });
    app.put('/repair/:repairId', (req: Request, res: Response) => {
        repairsController.updateRepair(req, res);
    });
    app.delete('/repair/:repairId', (req: Request, res: Response) => {
        repairsController.deleteRepair(req, res);
    });

    // Shipments routes
    app.get('/shipments', (req: Request, res: Response) => {
        shipmentsController.getShipments(req, res);
    });
    app.get('/shipment/:shipmentId', (req: Request, res: Response) => {
        shipmentsController.getShipmentById(req, res);
    });
    app.post('/shipment', (req: Request, res: Response) => {
        shipmentsController.createShipment(req, res);
    });
    app.put('/shipment/:shipmentId', (req: Request, res: Response) => {
        shipmentsController.updateShipment(req, res);
    });
    app.delete('/shipment/:shipmentId', (req: Request, res: Response) => {
        shipmentsController.deleteShipment(req, res);
    });

    // Trucks routes
    app.get('/trucks', (req: Request, res: Response) => {
        trucksController.getTrucks(req, res);
    });
    app.get('/truck/:truckId', (req: Request, res: Response) => {
        trucksController.getTruckById(req, res);
    });
    app.post('/truck', (req: Request, res: Response) => {
        trucksController.createTruck(req, res);
    });
    app.put('/truck/:truckId', (req: Request, res: Response) => {
        trucksController.updateTruck(req, res);
    });
    app.delete('/truck/:truckId', (req: Request, res: Response) => {
        trucksController.deleteTruck(req, res);
    });

    // TruckTrips routes
    app.get('/truckTrips', (req: Request, res: Response) => {
        truckTripsController.getTruckTrips(req, res);
    });
    app.get('/truckTrip/:tripId', (req: Request, res: Response) => {
        truckTripsController.getTruckTripById(req, res);
    });
    app.post('/truckTrip', (req: Request, res: Response) => {
        truckTripsController.createTruckTrip(req, res);
    });
    app.put('/truckTrip/:tripId', (req: Request, res: Response) => {
        truckTripsController.updateTruckTrip(req, res);
    });
    app.delete('/truckTrip/:tripId', (req: Request, res: Response) => {
        truckTripsController.deleteTruckTrip(req, res);
    });

}).catch(error => console.log("Error intializing data source", error));

// Error handling
app.use((err: any, req: Request, res: Response, next: Function) => {
    console.error(err);
    res.status(500).send('Something went wrong');
});

export default app;
