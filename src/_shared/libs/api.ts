import { ApiRequestProps, CustomAPIError } from '@/types/api';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { createChildLogger, initializeAPILogger } from './logger';
import { validateAuth } from './auth';

/**
 * Wrapper function for Next.js API routes.
 * @param handler - The handler function for the API route.
 * @returns A function that handles API requests.
 */
export const apiHandler = (handler: ({ req, params, user }: ApiRequestProps) => Promise<any>) => {
  return async function (req: NextRequest, { params }: any) {
    // Initialize logger for API request
    initializeAPILogger(req);
    const logger = createChildLogger({ trace: 'apiHandler' });

    try {
      const dbUser = await validateAuth();

      // Execute the handler function for the API route
      const response = await handler({ req, user: dbUser, params });

      // Log the end of the API request
      logger.info('Request ended');

      // Return the response
      return response;
    } catch (error: any) {
      console.log(error);

      // Log the error
      logger.error(`${error}`);

      // Handle custom API errors
      if (error instanceof CustomAPIError) {
        switch (error.type) {
          case 'ValidationError': {
            return NextResponse.json({ message: error.message }, { status: 400 });
          }
          case 'UnauthorizedError': {
            return NextResponse.json({ message: error.message }, { status: 401 });
          }
          case 'NotFoundError': {
            return NextResponse.json({ message: error.message }, { status: 404 });
          }
          default: {
            return NextResponse.json({ message: 'ServerError' }, { status: 500 });
          }
        }
      } else {
        // Return a generic server error if the error is not a custom API error
        return NextResponse.json({ message: 'ServerError' }, { status: 500 });
      }
    }
  };
};