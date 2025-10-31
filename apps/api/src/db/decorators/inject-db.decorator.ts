import { Inject } from '@nestjs/common';
import { DRIZZLE } from '../tokens/drizzle.token';

export const InjectDb = () => Inject(DRIZZLE);
