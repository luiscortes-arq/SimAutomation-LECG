import React from 'react';

export interface ComparisonData {
  category: string;
  manual: number;
  automated: number;
}

export interface FeatureProps {
  title: string;
  subtitle: string;
  description: string;
  align?: 'left' | 'right';
  children: React.ReactNode;
}