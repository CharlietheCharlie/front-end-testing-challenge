import React from 'react';
import { Lesson } from '../types';
import { 
  LoginForm, SecretMessage, TweetComposer, PaymentButton, 
  UserRoleList, TabSwitcher, DoubleForm, TagInput, 
  TooltipDemo, PreferenceForm, SimpleList, RetryButton, 
  DashboardWidget, SearchResults, Newsletter, HooksPlaceholder, 
  Cart, KanbanBoard, DeleteAction, ExternalLink 
} from './targets';

interface LessonPreviewProps {
  lesson: Lesson;
}

export const LessonPreview: React.FC<LessonPreviewProps> = ({ lesson }) => {
  switch(lesson.targetComponent) {
    case LoginForm: return <LoginForm />;
    case SecretMessage: return <SecretMessage />;
    case UserRoleList: return <UserRoleList />;
    case TabSwitcher: return <TabSwitcher />;
    case DoubleForm: return <DoubleForm />;
    case TweetComposer: return <TweetComposer />;
    case PaymentButton: return <PaymentButton />;
    case TagInput: return <TagInput />;
    case TooltipDemo: return <TooltipDemo />;
    case PreferenceForm: return <PreferenceForm />;
    case SimpleList: return <SimpleList />;
    case RetryButton: return <RetryButton />;
    case DashboardWidget: return <DashboardWidget />;
    case SearchResults: return <SearchResults />;
    case Newsletter: return <Newsletter />;
    case HooksPlaceholder: return <HooksPlaceholder />;
    case Cart: return <Cart />;
    case KanbanBoard: return <KanbanBoard />;
    case DeleteAction: return <DeleteAction />;
    case ExternalLink: return <ExternalLink />;
    default: return <div>Component Not Found</div>;
  }
};