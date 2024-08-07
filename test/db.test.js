const { PrismaClient } = require("@prisma/client");

// Mock the PrismaClient constructor
jest.mock("@prisma/client", () => {
    const mPrismaClient = {
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});
  
describe('PrismaClient', () => {
    let prisma;
  
    beforeAll(() => {
      // Require the module here to apply the mock
      prisma = require('../src/utils/db');
    });
  
    it('should instantiate PrismaClient', () => {
      expect(PrismaClient).toHaveBeenCalledTimes(1);
    });
  
    it('should have $connect and $disconnect methods', () => {
      expect(prisma.$connect).toBeDefined();
      expect(prisma.$disconnect).toBeDefined();
    });
});