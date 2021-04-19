import ReactGA from 'react-ga';
import env from '../env';

interface PageViewParams {
  path: string;
}

interface Params {
  category: string;
  action: string;
  value?: number;
  label?: string;
}

interface ClickParams
  extends Omit<Params, "category"> {
  action: "Clicked";
}

interface ModalOpenParams
  extends Omit<Params, "category"> {
  action: "Modal Opened";
}

class GATracker {
  private env: "development" | "production" | "test";

  constructor() {
    console.log(env.REACT_APP_GA_TRACKING_ID);
    if (!env.REACT_APP_GA_TRACKING_ID) {
      throw new Error("GA_TRACKING_ID must be provided.");
    }

    this.env = env.NODE_ENV;

    if (this.isProduction) {
      ReactGA.initialize(env.REACT_APP_GA_TRACKING_ID);
    }
  }

  private get isProduction() {
    return this.env === "production";
  }

  public trackPageView({ path }: PageViewParams) {
    const decodedPath = decodeURIComponent(path);

    if (!this.isProduction) {
      console.log(`Page Viewed: ${decodedPath}`);
      return;
    }

    ReactGA.pageview(decodedPath);
  }

  private trackEvent(params: Params) {
    if (!this.isProduction) {
      console.log(params);
      return;
    }

    ReactGA.event(params);
  }

  public trackProfileSectionEvent(params: ClickParams) {
    this.trackEvent({ category: "Profile", ...params });
  }

  public trackModalOpen(params: ModalOpenParams) {
    this.trackEvent({ category: "Modal", ...params });
  }
}

const GA = new GATracker();
export default GA;