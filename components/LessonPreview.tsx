import React from 'react';
import { Lesson } from '../types';
import { 
  LoginForm, SecretMessage, TweetComposer, PaymentButton, 
  UserRoleList, TabSwitcher, DoubleForm, TagInput, 
  TooltipDemo, PreferenceForm, UserForm, SimpleList, RetryButton, 
  DashboardWidget, SearchResults, Newsletter, HooksPlaceholder, 
  Cart, KanbanBoard, DeleteAction, ExternalLink,
  UserListNetwork, PaymentIframe, AvatarUpload, AuthGreeting,
  ResponsiveMenu, PopupTrigger,
  ThemeDisplay, ReduxCounter, ModalComponent, ErrorBoundaryDemo, ResponsiveComponent,
  RegistrationForm, LiveStatus, CopyLink
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
    case UserForm: return <UserForm onSubmit={() => {}} />;
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
    
    // Playwright new
    case UserListNetwork: return <UserListNetwork />;
    case PaymentIframe: return <PaymentIframe />;
    case AvatarUpload: return <AvatarUpload />;
    case AuthGreeting: return <AuthGreeting />;
    case ResponsiveMenu: return <ResponsiveMenu />;
    case PopupTrigger: return <PopupTrigger />;

    // Advanced
    case ThemeDisplay: return <ThemeDisplay />;
    case ReduxCounter: return <ReduxCounter />;
    case ModalComponent: return <ModalComponent />;
    case ErrorBoundaryDemo: return <ErrorBoundaryDemo />;
    case ResponsiveComponent: return <ResponsiveComponent />;

    // Expert
    case RegistrationForm: return <RegistrationForm />;
    case LiveStatus: return <LiveStatus />;
    case CopyLink: return <CopyLink />;

    default: return <div>Component Not Found</div>;
  }
};