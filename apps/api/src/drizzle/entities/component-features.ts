import { pgTable, text, uniqueIndex, foreignKey } from 'drizzle-orm/pg-core';
import { components } from './components';
import { features } from './features';
import { baseColumns } from '../helpers/columns';
import { stringBigint } from '../helpers/custom-types';

export const componentFeatures = pgTable(
  'component_features',
  {
    ...baseColumns,
    componentId: stringBigint('component_id').notNull(),
    featureId: stringBigint('feature_id').notNull(),
    valueText: text('value_text').notNull(),
  },
  (t) => [
    uniqueIndex('uq_comp_feature').on(t.componentId, t.featureId),
    foreignKey({
      name: 'fk_component_feature_component',
      columns: [t.componentId],
      foreignColumns: [components.id],
    }).onDelete('cascade'),
    foreignKey({
      name: 'fk_component_feature_feature',
      columns: [t.featureId],
      foreignColumns: [features.id],
    }).onDelete('cascade'),
  ],
).enableRLS();
