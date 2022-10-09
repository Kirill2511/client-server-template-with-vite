import { PhorumNewPageContent } from "../../../components/Phorum/PhorumThreadPage/PhorumNewPageContent/PhorumNewPageContent";
import { StaticLayout } from "../../../components/StaticLayout/StaticLayout";

import './PhorumNewThreadPage.scss';

export const PhorumNewThreadPage = () => {
    return (
        <StaticLayout><PhorumNewPageContent title="Новая тема" /></StaticLayout>
    );
}
