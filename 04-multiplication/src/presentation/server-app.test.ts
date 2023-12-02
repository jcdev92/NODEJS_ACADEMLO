import { CreateTable } from '../domain/uses-cases/create-table.use-cases';
import { SaveFile } from '../domain/uses-cases/save-file.use-case';
import { ServerApp } from './server-app'

describe('server app', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        destination: 'test-destination',
        name: 'test-name',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    //? PRUEBA DE INTEGRACION
    // test('should run ServerApp with options', () => {
    //     const logSpy = jest.spyOn(console, 'log');
    //     const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    //     const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');


    //     ServerApp.run(options);

    //     expect(logSpy).toHaveBeenCalledTimes(2);
    //     expect(logSpy).toHaveBeenCalledWith('Server running...');
    //     expect(logSpy).toHaveBeenCalledWith('File created!');
    //     expect(createTableSpy).toHaveBeenCalledWith({
    //         base: options.base,
    //         limit: options.limit,
    //     });

    //     expect(saveFileSpy).toHaveBeenCalledTimes(1);
    //     expect(saveFileSpy).toHaveBeenCalledWith({
    //         fileContent: expect.any(String),
    //         fileDestination: `${options.destination}/${options.name}-${options.base}`,
    //         fileName: `${options.name}`,
    //     });
    // });


    //? Prueba Unitaria
    test('should run ServerApp with options', () => {
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createTableMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createTableMock).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit,
        });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            fileDestination: `${options.destination}/${options.name}-${options.base}`,
            fileName: `${options.name}`,
        });
        expect(logMock).toHaveBeenCalledWith('File created!');
    });
});